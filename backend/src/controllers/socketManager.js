import { Server } from "socket.io";
import { ChatMessage } from "../models/chat.model.js";

let connections = {};
let timeOnline = {};

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("SOMETHING CONNECTED");

    socket.on("join-call", async (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

      // connections[path].forEach(elem => {
      //     io.to(elem)
      // })

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path],
        );
      }

      try {
        const history = await ChatMessage.find({ meetingCode: path })
          .sort({ createdAt: 1 })
          .limit(200);

        history.forEach((msg) => {
          io.to(socket.id).emit(
            "chat-message",
            msg.text,
            msg.sender,
            msg.socketId,
          );
        });
      } catch (e) {
        console.log("Failed to load chat history", e);
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", async (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }

          return [room, isFound];
        },
        ["", false],
      );

      if (found === true) {
        console.log("message", matchingRoom, ":", sender, data);

        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });

        try {
          await ChatMessage.create({
            meetingCode: matchingRoom,
            sender: sender,
            socketId: socket.id,
            text: data,
          });
        } catch (e) {
          console.log("Failed to persist chat message", e);
        }
      }
    });

    socket.on("disconnect", () => {
      var diffTime = Math.abs(timeOnline[socket.id] - new Date());

      var key;

      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections)),
      )) {
        for (let a = 0; a < v.length; ++a) {
          if (v[a] === socket.id) {
            key = k;

            for (let a = 0; a < connections[key].length; ++a) {
              io.to(connections[key][a]).emit("user-left", socket.id);
            }

            var index = connections[key].indexOf(socket.id);

            connections[key].splice(index, 1);

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });

  return io;
};

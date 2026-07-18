import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new Schema(
  {
    meetingCode: { type: String, required: true, index: true },
    sender: { type: String, required: true },
    socketId: { type: String },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export { ChatMessage };

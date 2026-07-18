import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { Meeting } from "../models/meeting.model.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please Provide" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User Not Found" });
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      return res.status(httpStatus.OK).json({
        token,
        username: user.username,
      });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Username or password" });
    }
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please provide name, username and password" });
  }

  // if (password.length < 6) {
  //   return res
  //     .status(httpStatus.BAD_REQUEST)
  //     .json({ message: "Password must be at least 6 characters" });
  // }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User Registered" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

const getUserHistory = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      user_id: req.user.username,
    });

    res.json(meetings);
  } catch (e) {
    res.json({
      message: `Something went wrong ${e}`,
    });
  }
};

const addToHistory = async (req, res) => {
  const { meeting_code } = req.body;

  try {
    const newMeeting = new Meeting({
      user_id: req.user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    res.status(httpStatus.CREATED).json({
      message: "Added code to history",
    });
  } catch (e) {
    res.json({
      message: `Something went wrong ${e}`,
    });
  }
};

export { login, register, getUserHistory, addToHistory };

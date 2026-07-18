import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// ai code
// Limits repeated login/register attempts from the same IP to slow down
// brute-force password guessing and mass account creation.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts, please try again later." },
});

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(authMiddleware, addToHistory);
router.route("/get_all_activity").get(authMiddleware, getUserHistory);

export default router;

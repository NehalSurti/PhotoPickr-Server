import { Router } from "express";
import { handleLogin, handleLoginCheck, handleRegister, handleForgetPassword, handleResetPassword, handleUser } from '../controller/authController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";
const router = Router();
router
    .post("/login", authLimiter, handleLogin)
    .post("/check/login", authLimiter, handleLoginCheck)
    .post("/register", authLimiter, handleRegister)
    .post("/forget-password", authLimiter, handleForgetPassword)
    .post("/reset-password", authLimiter, handleResetPassword)
    .get("/user", authMiddleware, handleUser);
export default router;

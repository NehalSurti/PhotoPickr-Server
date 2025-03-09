import { Router } from "express";
import { handleLogin, handleLoginCheck, handleRegister, handleForgetPassword, handleResetPassword, handleUser } from '../controller/authController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router
    .post("/login", handleLogin)
    .post("/check/login", handleLoginCheck)
    .post("/register", handleRegister)
    .post("/forget-password", handleForgetPassword)
    .post("/reset-password", handleResetPassword)
    .get("/user", authMiddleware, handleUser);

export default router;
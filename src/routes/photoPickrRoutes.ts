import { Router } from "express";
import { handleRegister, handleForgetPassword, handleResetPassword, handleUser } from '../controller/authController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";
import { handleFindPhotoPickr, handleFindUserPhotos, handlePhotoPickrUpdate } from "../controller/photoPickrControllers.js";

const router = Router();

router
    .get("/", authMiddleware, handleFindUserPhotos)
    .get("/:id", handleFindPhotoPickr)
    .put("/:id", authMiddleware, handlePhotoPickrUpdate)
// .post("/forget-password", authLimiter, handleForgetPassword)
// .post("/reset-password", authLimiter, handleResetPassword)
// .get("/user", authMiddleware, handleUser);

export default router;
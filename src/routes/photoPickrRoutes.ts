import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";
import { handleCreatePhotoPickr, handleDeletePhotoPickr, handleFindPhotoPickr, handleFindUserPhotos, handlePhotoPickrUpdate } from "../controller/photoPickrControllers.js";

const router = Router();

router
    .get("/", authMiddleware, handleFindUserPhotos)
    .get("/:id", authMiddleware, handleFindPhotoPickr)
    .put("/:id", authMiddleware, handlePhotoPickrUpdate)
    .post("/", authMiddleware, handleCreatePhotoPickr)
    .delete("/:id", authMiddleware, handleDeletePhotoPickr)
// .get("/user", authMiddleware, handleUser);

export default router;
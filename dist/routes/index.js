import { Router } from 'express';
import AuthRoutes from './authRoutes.js';
import VerifyRoutes from './verifyRoutes.js';
import PhotoPickrRoutes from './photoPickrRoutes.js';
const router = Router();
router.use("/api/auth", AuthRoutes);
router.use("/api/photoPickr", PhotoPickrRoutes);
router.use("/verify", VerifyRoutes);
export default router;

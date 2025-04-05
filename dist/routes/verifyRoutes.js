import { Router } from "express";
import { handleVerifyEmail, handleVerifyError } from '../controller/verifyController.js';
const router = Router();
router
    .get("/email", handleVerifyEmail)
    .get("/error", handleVerifyError);
export default router;

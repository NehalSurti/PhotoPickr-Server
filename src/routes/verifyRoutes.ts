import { Router } from "express";
import { handleVerifyEmail, handleVerifyError } from '../controller/verifyController.js';

const router = Router();

router
    .get("/verify/email", handleVerifyEmail)
    .get("/verify/error", handleVerifyError);    

export default router;
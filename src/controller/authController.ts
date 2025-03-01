import { Response, Request } from "express";
import prisma from "../config/database.js";
import { loginSchema } from "../validations/authValidation.js";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req: Request, res: Response) => {
    // try {
    //     const body = req.body;
    //     const payload = loginSchema.parse(body);

    //     // * Check if user exist
    //     let user = await prisma.user.findUnique({
    //         where: { email: payload.email },
    //     });
    //     if (!user) {
    //         return res
    //             .status(404)
    //             .json({ message: "No user found with this email." });
    //     }

    //     // * Check email verified or not
    //     if (user.email_verified_at === null) {
    //         return res.status(422).json({
    //             errors: {
    //                 email:
    //                     "Email is not verified yet.please check your email and verify your email.",
    //             },
    //         });
    //     }

    //     // Check password
    //     const compare = await bcrypt.compare(payload.password, user.password);
    //     if (!compare) {
    //         return res.status(422).json({
    //             errors: {
    //                 email: "Invalid Credentials.",
    //             },
    //         });
    //     }

    //     const JWTPayload = {
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //     };

    //     const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
    //         expiresIn: "365d",
    //     });

    //     const resPayload = {
    //         id: user.id,
    //         email: user.email,
    //         name: user.name,
    //         token: `Bearer ${token}`,
    //     };

    //     return res.json({
    //         message: "Logged in successfully!",
    //         data: resPayload,
    //     });
    // } catch (error) {
    //     if (error instanceof ZodError) {
    //         const errors = formatError(error);
    //         res.status(422).json({ message: "Invalid data", errors });
    //     } else {
    //         logger.error({ type: "Auth Error", body: error });
    //         res
    //             .status(500)
    //             .json({ error: "Something went wrong.please try again!", data: error });
    //     }
    // }

}

export const handleLoginCheck = async (req: Request, res: Response) => {
    // try {
    //     const body = req.body;
    //     const payload = loginSchema.parse(body);
    //     // * Check if user exist
    //     let user = await prisma.user.findUnique({
    //         where: { email: payload.email },
    //     });
    //     if (!user) {
    //         return res.status(422).json({
    //             errors: {
    //                 email: "No user found with this email.",
    //             },
    //         });
    //     }
    //     // * Check email verified or not
    //     if (user.email_verified_at === null) {
    //         return res.status(422).json({
    //             errors: {
    //                 email:
    //                     "Email is not verified yet.please check your email and verify your email.",
    //             },
    //         });
    //     }
    //     // Check password
    //     if (!bcrypt.compareSync(payload.password, user.password)) {
    //         return res.status(422).json({
    //             errors: {
    //                 email: "Invalid Credentials.",
    //             },
    //         });
    //     }
    //     return res.json({
    //         message: "Logged in successfully!",
    //         data: null,
    //     });
    // } catch (error) {
    //     if (error instanceof ZodError) {
    //         const errors = formatError(error);
    //         res.status(422).json({ message: "Invalid login data", errors });
    //     } else {
    //         logger.error({ type: "Auth Error", body: error });
    //         res.status(500).json({
    //             error: "Something went wrong.please try again!",
    //             data: error,
    //         });
    //     }
    // }
}

export const handleRegister = async (req: Request, res: Response) => { }

export const handleForgetPassword = async (req: Request, res: Response) => { }

export const handleResetPassword = async (req: Request, res: Response) => { }

export const handleUser = async (req: Request, res: Response) => { }
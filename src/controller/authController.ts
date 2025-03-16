import { Response, Request } from "express";
import prisma from "../config/database.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { formatError, generateRandomNum, renderEmailEjs } from "../utils/helper.js";
import { emailQueue, emailQueueName } from "../jobs/EmailQueue.js";

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);

        // * Check if user exist
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user || user === null) {
            return res
                .status(404)
                .json({ message: "No user found with this email." });
        }

        // * Check email verified or not
        if (user.email_verified_at === null) {
            return res.status(422).json({
                errors: {
                    email:
                        "Email is not verified yet.please check your email and verify your email.",
                },
            });
        }

        // Check password
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            return res.status(422).json({
                errors: {
                    email: "Invalid Credentials.",
                },
            });
        }

        const JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const token = jwt.sign(JWTPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: "365d",
        });

        const resPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            token: `Bearer ${token}`,
        };

        return res.json({
            message: "Logged in successfully!",
            data: resPayload,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        } else {
            // logger.error({ type: "Auth Error", body: error });
            res
                .status(500)
                .json({ error: "Something went wrong. Please try again!", data: error });
        }
    }

}

export const handleLoginCheck = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        // * Check if user exist
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user) {
            return res.status(422).json({
                errors: {
                    email: "No user found with this email.",
                },
            });
        }
        // * Check email verified or not
        if (user.email_verified_at === null) {
            return res.status(422).json({
                errors: {
                    email:
                        "Email is not verified yet.please check your email and verify your email.",
                },
            });
        }
        // Check password
        if (!bcrypt.compareSync(payload.password, user.password)) {
            return res.status(422).json({
                errors: {
                    email: "Invalid Credentials.",
                },
            });
        }
        return res.json({
            message: "Logged in successfully!",
            data: null,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid login data", errors });
        } else {
            // logger.error({ type: "Auth Error", body: error });
            res.status(500).json({
                error: "Something went wrong.please try again!",
                data: error,
            });
        }
    }
}

export const handleRegister = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (user) {
            return res.status(422).json({
                message: "Email already taken.",
                errors: {
                    email: "Email already taken.please use another one.",
                },
            });
        }
        //   * Encrypt the password
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

        const id = generateRandomNum();
        const token = await bcrypt.hash(id, salt);
        const url = `${process.env.APP_URL}/verify/email/?email=${payload.email}&token=${token}`;

        const html = await renderEmailEjs("verify-email", {
            name: payload.name,
            url: url,
        });
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Please verify your email",
            body: html,
        });
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token,
            },
        });
        return res.json({ message: "Please check your Email. We have sent you a verification email!" });
    } catch (error) {
        console.log("The error is ", error);
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            // logger.error({ type: "Register Error", body: JSON.stringify(error) });
            res.status(500).json({ error: "Something went wrong. Please try again!", data: error });
        }
    }
}

export const handleForgetPassword = async (req: Request, res: Response) => { }

export const handleResetPassword = async (req: Request, res: Response) => { }

export const handleUser = async (req: Request, res: Response) => {
    const user = req.user;
    return res.json({ message: "Fetched", user });
}
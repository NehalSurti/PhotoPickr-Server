import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ message: "Email is required." })
        .email({ message: "Please enter correct email" }),
    password: z.string({ message: "Password is required" }),
});
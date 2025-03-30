import { v4 as uuidv4 } from "uuid";
import ejs from "ejs";
import { fileURLToPath } from "url";
import * as path from "path";
import { ZodError } from "zod";
import moment from "moment";
import fs from "fs";
import { supportedMimes } from "../config/filesystem.js";
import { UploadedFile } from "express-fileupload";

export const formatError = (error: ZodError): Record<string, string> => {
    let errors: Record<string, string> = {};

    error.issues?.forEach((issue) => {
        const key = issue.path?.[0] || "unknown_field"; // Extract the field name
        errors[key] = issue.message; // Store the error message
    });

    return errors; // Return formatted errors
};


export const generateRandomNum = () => {
    return uuidv4();
};

export const renderEmailEjs = async (fileName: string, payload: any): Promise<string> => {
    // Get the current directory of the utils folder
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Correct the path to the views/emails folder
    const templatePath = path.resolve(__dirname, '..', 'views', 'emails', `${fileName}.ejs`);

    // Render the EJS template with the provided data
    const html: string = await ejs.renderFile(templatePath, payload);

    // Return the rendered HTML content
    return html;
};

export const checkDateHourDifference = (date: Date | string): number => {
    const now = moment();
    const tokenSentAt = moment(date);
    const difference = moment.duration(now.diff(tokenSentAt));
    const hoursDiff = difference.asHours();
    return hoursDiff;
};

export const imageValidator = (size: number, mime: string) => {
    if (bytesToMb(size) > 2) {
        return "Image size must be less than 2 MB";
    } else if (!supportedMimes.includes(mime)) {
        return "Image must be type of png,jpg,jpeg,svg,webp,gif..";
    }

    return null;
};

export const bytesToMb = (bytes) => {
    return bytes / (1024 * 1024);
};

export const removeImage = (imageName: string) => {
    const path = process.cwd() + "/public/images/" + imageName;
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

export const uploadImage = (image: UploadedFile) => {
    const imgExt = image?.name.split(".");
    const imageName = generateRandomNum() + "." + imgExt[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName;
    image.mv(uploadPath, (err) => {
        if (err) throw err;
    });

    return imageName;
};
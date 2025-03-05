import { v4 as uuidv4 } from "uuid";
import ejs from "ejs";
import { fileURLToPath } from "url";
import * as path from "path";
import { ZodError } from "zod";

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
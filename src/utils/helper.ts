import { v4 as uuidv4 } from "uuid";
import ejs from "ejs";
import { fileURLToPath } from "url";
import * as path from "path";

export const generateRandomNum = () => {
    return uuidv4();
};

export const renderEmailEjs = async (fileName: string, payload: any) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(
        __dirname + `/views/emails/${fileName}.ejs`,
        payload
    );
    return html;
};
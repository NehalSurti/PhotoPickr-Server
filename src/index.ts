import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import { sendMail } from "./config/mail.js";

const app: Application = express();

// In ES6, __dirname is not available by default, so you need to define it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the path for the views directory
app.set('views', path.resolve(__dirname, './views'));

// Set Queue
import { emailQueue, emailQueueName } from './jobs/EmailQueue.js';


app.get('/', async (req:Request, res:Response) => {
    const html = await ejs.renderFile(__dirname + '/views/emails/welcome.ejs', { name: 'Nehal' });
    await sendMail("nehalsurti9998@gmail.com", "Testing Email", html);
    // await emailQueue.add(emailQueueName,{to:"nehalsurti9998@gmail.com", subject:"Testing Email", body:html});
    return res.json({ msg: "Email Sent" });
});

const PORT = process.env.PORT || 7000;

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
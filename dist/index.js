import express from "express";
import "dotenv/config";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { limiter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
const app = express();
// In ES6, __dirname is not available by default, so you need to define it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the path for the views directory
app.set('views', path.resolve(__dirname, './views'));
// Set Queue
// import { emailQueue, emailQueueName } from './jobs/EmailQueue.js';
app.use(routes);
// app.get('/', async (req: Request, res: Response) => {
// const html = await ejs.renderFile(__dirname + '/views/emails/welcome.ejs', { name: 'Nehal' });
// await sendMail("nehalsurti9998@gmail.com", "Testing Email", html);
// await emailQueue.add(emailQueueName, { to: "nehalsurti9998@gmail.com", subject: "Testing Email", body: html });
// return res.json({ msg: "Email Sent" });
// });
const PORT = process.env.PORT || 7000;
// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

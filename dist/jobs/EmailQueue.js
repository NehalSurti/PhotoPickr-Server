// import { Job, Queue, Worker } from "bullmq";
// import { defaultQueueConfig, redisConnection } from "../config/queue.js";
// import { sendMail } from "../config/mail.js";
export {};
// export const emailQueueName = "emailQueue";
// interface EmailJobDataType {
//     to: string;
//     subject: string;
//     body: string;
// }
// // Define a queue
// export const emailQueue = new Queue(emailQueueName, {
//     connection: redisConnection,
//     defaultJobOptions: defaultQueueConfig,
// });
// // Worker to process the jobs from the queue
// export const handler = new Worker(
//     emailQueueName,
//     async (job: Job) => {
//         const data: EmailJobDataType = job.data;
//         await sendMail(data.to, data.subject, data.body);
//     },
//     { connection: redisConnection }
// );

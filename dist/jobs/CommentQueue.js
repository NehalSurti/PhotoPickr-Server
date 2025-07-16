import { Queue, Worker } from "bullmq";
import { defaultQueueConfig, redisConnection } from "../config/queue.js";
import prisma from "../config/database.js";
export const commentQueueName = "commentQueue";
export const commentQueue = new Queue(commentQueueName, {
    connection: redisConnection,
    defaultJobOptions: {
        ...defaultQueueConfig,
        delay: 500,
    },
});
// * Workers
export const handler = new Worker(commentQueueName, async (job) => {
    const data = job.data;
    await prisma.photoPickrComments.create({
        data: {
            comment: data?.comment,
            PhotoPickr_id: Number(data?.id),
        },
    });
}, { connection: redisConnection });

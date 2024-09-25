import { ConnectionOptions, DefaultJobOptions } from "bullmq";
import IORedis from "ioredis";

export const redisConnection: ConnectionOptions = new IORedis.default({
    host: process.env.REDIS_HOST,
    port: 6379,
    maxLoadingRetryTime: null,
    maxRetriesPerRequest: null,
});
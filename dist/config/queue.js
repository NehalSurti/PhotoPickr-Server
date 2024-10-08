import IORedis from "ioredis";
// Create a Redis connection
export const redisConnection = new IORedis.default({
    host: process.env.REDIS_HOST,
    port: 6379,
    maxLoadingRetryTime: null,
    maxRetriesPerRequest: null,
});
export const defaultQueueConfig = {
    removeOnComplete: {
        count: 20,
        age: 60 * 60,
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 1000,
    },
};

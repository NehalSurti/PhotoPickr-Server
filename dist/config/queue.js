import IORedis from "ioredis";
export const redisConnection = new IORedis.default({
    host: process.env.REDIS_HOST,
    port: 6379,
    maxLoadingRetryTime: null,
    maxRetriesPerRequest: null,
});

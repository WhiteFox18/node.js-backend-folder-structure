import redis from "./redis_promise";

export const deleteRedisKeys = async () => {
    await redis.del("*");
};

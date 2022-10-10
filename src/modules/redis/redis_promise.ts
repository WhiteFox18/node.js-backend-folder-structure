import { promisify } from "util";
import redisClient from "./index";

const redisPromise = {
    set: promisify(redisClient.set).bind(redisClient),
    get: promisify(redisClient.get).bind(redisClient),
    keys: promisify(redisClient.keys).bind(redisClient),
    del: promisify(redisClient.del).bind(redisClient),
    hGet: promisify(redisClient.hget).bind(redisClient),
    hSet: promisify(redisClient.hset).bind(redisClient),
    hDel: promisify(redisClient.hdel).bind(redisClient),
};

export default redisPromise;

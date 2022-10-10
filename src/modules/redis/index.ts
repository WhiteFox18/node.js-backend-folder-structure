//Configure redis client
import { createClient } from "redis";
import config from "../../config";

const redisClient = createClient({
    url: config.redis_url,
});

export default redisClient;

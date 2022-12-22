//Configure redis client
import { createClient } from "redis"
import config from "../../config"

const redisClient = createClient({
    url: config.redis_url,
    enable_offline_queue: false,
})

export default redisClient

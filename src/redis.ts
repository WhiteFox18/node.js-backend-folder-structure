//Configure redis client
import {createClient} from "redis"
import { promisify } from "util";

let redisClient = createClient()

export const redisPromise = {
    set: promisify(redisClient.set).bind(redisClient),
    get: promisify(redisClient.get).bind(redisClient),
    keys: promisify(redisClient.keys).bind(redisClient)
}

export default redisClient
import { ExtendedDatabase } from "../../db/initOptions"
import { CachingExecute } from "./types"
import redisPromise from "../../modules/redis/redis_promise"
import { RedisKeys } from "../../types"

export default class CachingService {
    private readonly db: ExtendedDatabase = null

    constructor(db: ExtendedDatabase) {
        this.db = db
    }

    execute = async (data: CachingExecute) => {
        return data
    }

    getDummy = async () => {
        return JSON.parse(await redisPromise.get(RedisKeys.dummy_key))
    }
}
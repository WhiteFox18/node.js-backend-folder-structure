import { ExtendedDatabase } from "../../db/initOptions"

export default class CachingModel {
    private readonly db: ExtendedDatabase = null

    constructor(db: ExtendedDatabase) {
        this.db = db
    }
};
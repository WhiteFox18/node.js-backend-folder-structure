import { ExtendedDatabase } from "../db/initOptions";
import { CachingExecute } from "./types";

export default class CachingService {
    private readonly db: ExtendedDatabase = null;

    constructor(db: ExtendedDatabase) {
        this.db = db;
    }

    execute = async (data: CachingExecute) => {

    };
}
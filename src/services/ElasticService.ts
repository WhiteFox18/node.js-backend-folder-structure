import { ExtendedDatabase } from "../db/initOptions";
import { ElasticExecute } from "./types";

export default class ElasticService {
    private readonly db: ExtendedDatabase = null;

    constructor(db: ExtendedDatabase) {
        this.db = db;
    }

    execute = async (data: ElasticExecute) => {
        console.log(data);
    };
}
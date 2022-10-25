import { ExtendedDatabase } from "../../db/initOptions";

export default class ElasticModel {
    private readonly db: ExtendedDatabase = null;

    constructor(db: ExtendedDatabase) {
        this.db = db;
    }
};
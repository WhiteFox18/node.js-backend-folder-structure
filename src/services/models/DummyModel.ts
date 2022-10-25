import { ExtendedDatabase, Transaction } from "../../db/initOptions";

export default class DummyModel {
    private readonly db: ExtendedDatabase = null;

    constructor(db: ExtendedDatabase) {
        this.db = db;
    }

    dummyFunc = async (data: { search: string }, db: ExtendedDatabase | Transaction = this.db) => {
        return await db.one(`
            SELECT now();
        `);
    };
}
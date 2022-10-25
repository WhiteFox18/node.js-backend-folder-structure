import { ExtendedDatabase, Transaction } from "../db/initOptions";

export default class DummyService {
    private readonly db: ExtendedDatabase = null;

    constructor(db: ExtendedDatabase) {
        this.db = db;
    }

    dummyFunc = async (data: { search: string }) => {
        return await this.db.tx(async (transaction: Transaction) => {
            return this.db.dummy.query.dummyFunc(data, transaction);
        });
    };
}
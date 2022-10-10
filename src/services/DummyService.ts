import { ExtendedDatabase } from "../db/initOptions";

export default class DummyService {
    private readonly db: ExtendedDatabase = null;

    constructor(db: ExtendedDatabase) {
        this.db = db;
    }

    dummyFunc = async (data: { search: string }) => {
        try {
            return this.db.oneOrNone(
                this.db.dummy.query.dummyFunc(data),
            );
        } catch (e) {
            throw e;
        }
    };
}
import {Database, DatabaseClient, ServiceProps} from "../types";
import DummyModel from "./models/DummyModel";

export default class DummyService {
    private db: Database = null;
    private pg: DatabaseClient = null;

    constructor(props: ServiceProps) {
        this.db = props.db
        this.pg = props.pg
    }

    dummyFunc = async () => {
        await DummyModel.dummyFunc()
    }
}
import pgPromise from "pg-promise";
import {IClient} from "pg-promise/typescript/pg-subset";

export type Database = pgPromise.IDatabase<any, IClient>

export type DatabaseClient = pgPromise.IMain<{}, IClient>

export interface ServiceProps {
    db: Database;
    pg: DatabaseClient;
}
import { ElasticIndexes, RedisKeys } from "../types";

export interface ElasticExecuteUpdate {
    table_name: ElasticIndexes;
    id: string;
    data: any;
    difference: string[]
}

export interface ElasticExecuteDelete {
    table_name: ElasticIndexes;
    id: string;
}

export interface ElasticExecute extends ElasticExecuteUpdate {
    operation: "insert" | "update" | "delete";
}

export interface CachingExecuteUpdate {
    table_name: RedisKeys;
    id: string;
    data: any;
}

export interface CachingExecute extends CachingExecuteUpdate {
    operation: "insert" | "update" | "delete";
}
import { RedisKeys } from "../../types"

export interface CachingExecuteUpdate {
    table_name: RedisKeys;
    id: string;
    data: any;
}

export interface CachingExecute extends CachingExecuteUpdate {
    operation: "insert" | "update" | "delete";
}
import * as promise from "bluebird"
import pgPromise, { IDatabase, ITask } from "pg-promise"

import CachingModel from "../services/CachingService/model"
import CachingService from "../services/CachingService"

export interface IExtensions {
    caching: { model: CachingModel; service: CachingService; };
}

export type Transaction = ITask<IExtensions> & IExtensions
export type ExtendedDatabase = IDatabase<IExtensions> & IExtensions

export const initOptions: any = {
    // Using a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend: function(db: ExtendedDatabase, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases with different access API.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        //  TODO: Create repo classes that include only SQL queries as methods and extend obj with repos

        db.caching = {
            model: new CachingModel(db),
            service: new CachingService(db),
        }
    },
}

export const writableMode = new pgPromise.txMode.TransactionMode({
    tiLevel: pgPromise.txMode.isolationLevel.serializable,
    readOnly: false,
    deferrable: true,
})

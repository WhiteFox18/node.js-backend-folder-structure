import * as promise from "bluebird";
import pgPromise, { IDatabase, ITask } from "pg-promise";
import DummyService from "../services/DummyService";
import DummyModel from "../services/models/DummyModel";
import CachingService from "../services/CachingService";
import CachingModel from "../services/models/CachingModel";
import ElasticService from "../services/ElasticService";
import ElasticModel from "../services/models/ElasticModel";

export interface IExtensions {
    dummy: { service: DummyService; query: typeof DummyModel };
    caching: { service: CachingService; query: typeof CachingModel };
    elastic: { service: ElasticService; query: typeof ElasticModel };
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
        db.dummy = {
            query: DummyModel,
            service: new DummyService(db),
        };

        db.elastic = {
            query: ElasticModel,
            service: new ElasticService(db),
        };

        db.caching = {
            query: CachingModel,
            service: new CachingService(db),
        };
    },
};

export const writableMode = new pgPromise.txMode.TransactionMode({
    tiLevel: pgPromise.txMode.isolationLevel.serializable,
    readOnly: false,
    deferrable: true,
});

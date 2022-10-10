import { migrate } from "postgres-migrations";
import path from "path";
import config from "../../config";
import db from "../index";
import { deleteRedisKeys } from "../../modules/redis/redis_helpers";
import { createElasticIndexes, deleteElasticIndexes } from "../../modules/elasticsearch/elastic_helpers";

(async () => {
    const dbConfig = {
        host: config.database.host,
        database: config.database.name,
        user: config.database.user,
        password: config.database.password,
        port: config.database.port,

        // Default: false for backwards-compatibility
        // This might change!
        ensureDatabaseExists: true,

        // Default: "postgres"
        // Used when checking/creating "database-name"
        defaultDatabase: config.database.default_name,
    };

    await db.none("DROP TABLE IF EXISTS migrations;");

    await deleteElasticIndexes();
    await createElasticIndexes();
    await deleteRedisKeys();

    await db.none("DROP TABLE IF EXISTS migrations;");

    await migrate(
        dbConfig,
        path.join(path.resolve(), "constants", "migrations-mock-data"),
    );

    await db.none("DROP TABLE IF EXISTS migrations;");

    // if there is
    setTimeout(() => {
        process.exit(0);
    }, 10000);
})();

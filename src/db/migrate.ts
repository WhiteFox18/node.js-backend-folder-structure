import {migrate} from "postgres-migrations"
import path from "path";
import dotenv from "dotenv";

dotenv.config();

(async () => {
    const dbConfig = {
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),

        // Default: false for backwards-compatibility
        // This might change!
        ensureDatabaseExists: true,

        // Default: "postgres"
        // Used when checking/creating "database-name"
        defaultDatabase: process.env.DATABASE_DEFAULT_NAME
    }

    await migrate(dbConfig, path.join(path.resolve(), "constants", "migrations"))
})()
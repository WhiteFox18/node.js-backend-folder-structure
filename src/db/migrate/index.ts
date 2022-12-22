import { migrate } from "postgres-migrations"
import path from "path"
import config from "../../config"

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
    }

    await migrate(
        dbConfig,
        path.join(path.resolve(), "constants", "migrations"),
    )

    process.exit(0)
})()

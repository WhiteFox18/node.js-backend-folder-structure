import { types } from "pg"
import pgPromise, { ICTFObject, IFormattingOptions, IMain, QueryFile } from "pg-promise"
import { Diagnostics } from "./diagnostics"
import * as fs from "fs"
import path from "path"
import config from "../config"
import startDatabaseListening from "./listener"
import { ExtendedDatabase, initOptions } from "./initOptions"

const dbConfig = {
    host: config.database.host,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
}

const pgp: IMain = pgPromise(initOptions)

// To write every query from pgp.as.format into the file
if (config.production !== true) {
    if (!fs.existsSync(path.join(path.resolve(), "constants"))) {
        fs.mkdirSync(path.join(path.resolve(), "constants"), {
            mode: 0o755,
        })
        fs.writeFileSync(
            path.join(path.resolve(), "constants", "queries.txt"),
            "",
            {
                mode: 0o755,
            },
        )
    }

    const oldFormat = pgp.as.format
    pgp.as.format = (
        query: string | QueryFile | ICTFObject,
        values?: any,
        options?: IFormattingOptions,
    ): string => {
        const queryToReturn = oldFormat(query, values, options)

        let formatted = queryToReturn

        formatted += "\n"
        formatted += "##############################"
        formatted += "\n"

        fs.writeFileSync(
            path.join(path.resolve(), "constants", "queries.txt"),
            formatted,
            {
                flag: "a",
            },
        )

        return queryToReturn
    }
}

// To parse bigint
pgp.pg.types.setTypeParser(types.builtins.INT4, parseInt)
pgp.pg.types.setTypeParser(types.builtins.INT8, parseInt)

// To parse float and numeric
pgp.pg.types.setTypeParser(types.builtins.FLOAT4, parseFloat)
pgp.pg.types.setTypeParser(types.builtins.FLOAT8, parseFloat)
pgp.pg.types.setTypeParser(types.builtins.NUMERIC, parseFloat)

// To parse array of bigint in database query result
const parseBigIntArray = pgp.pg.types.getTypeParser(1016)
pgp.pg.types.setTypeParser(1016, (a) => parseBigIntArray(a).map(parseInt))

// Creating the database instance with extensions:
const db: ExtendedDatabase = pgp(dbConfig)

// Initializing optional diagnostics:
Diagnostics.init(initOptions)

export default db
export { pgp }

startDatabaseListening()

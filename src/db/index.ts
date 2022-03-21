import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config()

const pg = pgPromise({ capSQL: true })

const connectionObject = {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
}

const db = pg(connectionObject)

export default db
export { pg }
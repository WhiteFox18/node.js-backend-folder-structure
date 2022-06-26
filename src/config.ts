import dotenv from "dotenv";

dotenv.config()

const config = {
    database: {
        host: process.env.DATABASE_HOST,
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT)
    },
    session_secret: process.env.SESSION_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    salt_round: Number(process.env.SALT_ROUNDS),
    production: process.env.PRODUCTION === "true",
    port: Number(process.env.PORT)
}

export default config
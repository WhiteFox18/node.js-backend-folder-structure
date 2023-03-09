import dotenv from "dotenv"
import path from "path"

const node_env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development"

dotenv.config({
    path: path.join(path.resolve(), `.env.${node_env}`),
})

const config = {
    node_env: node_env,
    allowed_origins: process.env.ALLOWED_ORIGINS.split(", "),
    database: {
        host: process.env.DATABASE_HOST,
        name: process.env.DATABASE_NAME,
        default_name: process.env.DATABASE_DEFAULT_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT),
    },
    session_secret: process.env.SESSION_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    salt_round: Number(process.env.SALT_ROUNDS),
    port: Number(process.env.PORT),
    aws: {
        region: process.env.AWS_REGION,
        access_key_id: process.env.AWS_ACCESS_KEY_ID,
        secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
        base_urls: {
            images: String(process.env.AWS_BASE_URL_IMAGES),
        },
    },
    redis_url: process.env.REDIS_URL,
    elastic: {
        username: String(process.env.ELASTIC_USERNAME),
        password: String(process.env.ELASTIC_PASSWORD),
        node_url: process.env.ELASTIC_NODE_URL,
    },
    sendgrid: {
        api_key: String(process.env.SENDGRID_API_KEY),
        email_address: String(process.env.SENDGRID_EMAIL_ADDRESS),
    },
}

export default config
import dotenv from "dotenv";

dotenv.config();

const config = {
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
    production: process.env.PRODUCTION === "true",
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
};

export default config;
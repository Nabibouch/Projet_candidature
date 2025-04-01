import dotenv from "dotenv";

dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    DB_name: process.env.DB,
    URI_mongo: process.env.URI_mongo,
    JWT_SECRETS: process.env.JWT_SECRETS,
}

export default ENV;
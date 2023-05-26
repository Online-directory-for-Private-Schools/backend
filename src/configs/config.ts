import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "",
    mailUser: process.env.MAIL_USER || "",
    mailPass: process.env.MAIL_PASS || "",

    dbHost: process.env.DB_HOST || "",
    dbName: process.env.DB_NAME || "",
    dbPort: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    dbUsername: process.env.DB_USERNAME || "",
    dbPassword: process.env.DB_PASS || "",
};

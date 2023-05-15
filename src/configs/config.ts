import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "",
    mailUser: process.env.MAIL_USER || "",
    mailPass: process.env.MAIL_PASS || "",
};

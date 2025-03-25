import { config } from "dotenv";
config();

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        BLOGS: "/blogs",
        POSTS: "/posts",
    },
    MONGO_URL: process.env.MONGO_URL || "mongodb://0.0.0.0:27017",
    DB_NAME: process.env.DB_NAME || "test",

};
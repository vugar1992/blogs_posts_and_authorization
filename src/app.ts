import express from "express";
import cors from "cors";
import { SETTINGS } from "./settings";
import { blogsRouter, deleteAllBlogsRouter } from "./modules/blogs/blogs-router";
import {deleteAllPostsRouter, postRouter} from "./modules/posts/posts-router";

export const app = express();
app.use(express.json());
app.use(cors());

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use("/testing", deleteAllBlogsRouter);
app.use(SETTINGS.PATH.POSTS, postRouter);
app.use("/testing", deleteAllPostsRouter)
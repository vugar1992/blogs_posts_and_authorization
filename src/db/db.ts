import { IdbBlogs } from "./DBBlogsType";
import { IdbPosts } from "./IdbPosts";

type BlogsType = {
    blogs: IdbBlogs[];
    posts: IdbPosts[];
};

export const db: BlogsType = {
    blogs: [],
    posts: [],
};

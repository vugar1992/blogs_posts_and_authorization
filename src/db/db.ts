import {IdbBlogs} from "./DBBlogsType";

type BlogsType = {
    blogs: IdbBlogs[];
}

export const db:BlogsType = {
    blogs: []
}
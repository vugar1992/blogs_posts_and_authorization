import {DBBlogsType} from "./DBBlogsType";

type BlogsType = {
    blogs: DBBlogsType[];
}

export const db:BlogsType = {
    blogs: []
}
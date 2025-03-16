import {db} from "../db/db";
import {DBBlogsType} from "../db/DBBlogsType";
import {CreateBlogsInput} from "../routers/blogs-router";



export const blogsRepository = {

    createNewBlog(data:CreateBlogsInput):void {

        const { name, description, websiteUrl } = data;

        const blog = {
            id: new Date().getTime().toString(),
            name,
            description,
            websiteUrl
        }

        db.blogs.push(blog)
        // return blog
    }
}
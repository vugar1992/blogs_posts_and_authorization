import {db} from "../db/db";
import {DBBlogsType} from "../db/DBBlogsType";
import {BlogsInput} from "../routers/blogs-router";


export const blogsRepository = {

    getAllBlogs() {
        return db.blogs
    },

    createNewBlog(data:BlogsInput):void {

        const { name, description, websiteUrl } = data;

        const blog:DBBlogsType = {
            id: new Date().getTime().toString(),
            name,
            description,
            websiteUrl
        }

        db.blogs.push(blog)
    },

    getBlogById(id:string):DBBlogsType | undefined {
        const index:number = db.blogs.findIndex(blog=> blog.id === id)

        return db.blogs[index]
    },

    updateBlog(newData:BlogsInput, id:string):void {
        const { name, description, websiteUrl } = newData

        const index = db.blogs.findIndex(blog=> blog.id === id);

        db.blogs[index] = {
            ...db.blogs[index],
            name,
            description,
            websiteUrl
        }

    },

    deleteBlog(id:string):void {
        db.blogs = db.blogs.filter(blog=> blog.id !== id)
    },

    deleteAllBD() {
        db.blogs = [];
    }

}
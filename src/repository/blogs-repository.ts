import {db} from "../db/db";
import {IdbBlogs} from "../db/DBBlogsType";
import {BlogsInput} from "../routers/blogs-router";


export const blogsRepository = {

    getAllBlogs(): IdbBlogs[] {
        return db.blogs
    },

    createNewBlog(data: BlogsInput): IdbBlogs {

        const {name, description, websiteUrl} = data;

        const blog: IdbBlogs = {
            id: new Date().getTime().toString(),
            name,
            description,
            websiteUrl
        }

        db.blogs.push(blog)
        return blog;
    },

    getBlogById(id: string): IdbBlogs | null {
        const index: number = db.blogs.findIndex((blog: IdbBlogs): boolean => blog.id === id)

        return db.blogs[index] ?? null
    },

    updateBlog(newData: BlogsInput, id: string): void {
        const {name, description, websiteUrl} = newData

        const index: number = db.blogs.findIndex((blog: IdbBlogs): boolean => blog.id === id);

        db.blogs[index] = {
            ...db.blogs[index],
            name,
            description,
            websiteUrl
        }

    },

    deleteBlog(id: string): void {
        db.blogs = db.blogs.filter((blog: IdbBlogs): boolean => blog.id !== id)
    },

    deleteAllBD() {
        db.blogs = [];
    }

}
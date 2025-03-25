import {db} from "../db/db";
import {IdbBlogs} from "../db/DBBlogsType";
import {BlogsInput} from "../routers/blogs-router";
import {blogsCollection} from "../db/mongoDB"
import {ObjectId} from "mongodb"


export const blogsRepository = {

    async getAllBlogs(): Promise<IdbBlogs[]> {
        return blogsCollection.find({}).toArray()
    },

    async createNewBlog(data: BlogsInput): Promise<ObjectId> {

        const {name, description, websiteUrl} = data;
        const _id:ObjectId = new ObjectId();

        const blog: IdbBlogs = {
            _id,
            name,
            description,
            websiteUrl
        }

        // db.blogs.push(blog)
        const db = await blogsCollection.insertOne(blog);
        return db.insertedId;
    },

    async getBlogById(id: string): Promise<IdbBlogs | null> {
        const index: number = db.blogs.findIndex((blog: IdbBlogs): boolean => blog.id === id)

        return db.blogs[index] ?? null
    },

    async updateBlog(newData: BlogsInput, id: string): Promise<void> {
        const {name, description, websiteUrl} = newData

        const index: number = db.blogs.findIndex((blog: IdbBlogs): boolean => blog.id === id);

        db.blogs[index] = {
            ...db.blogs[index],
            name,
            description,
            websiteUrl
        }

    },

    async deleteBlog(id: string): Promise<void> {
        db.blogs = db.blogs.filter((blog: IdbBlogs): boolean => blog.id !== id)
    },

    async deleteAllBD() {
        db.blogs = [];
    }

}
import {db} from "../../db/db";
import {IdbBlogs} from "../../db/DBBlogsType";
import {blogsCollection} from "../../db/mongoDB"
import {ObjectId} from "mongodb"
import {BlogsInput} from "./blogs-controller";


export const blogsRepository = {

    async getBlogs(): Promise<IdbBlogs[]> {
        return blogsCollection.find({}).toArray()
    },

    async createNewBlog(data: BlogsInput): Promise<ObjectId> {

        const {name, description, websiteUrl} = data;


        const blog: IdbBlogs = {
            name,
            description,
            websiteUrl
        }

        const db = await blogsCollection.insertOne(blog);
        return db.insertedId;
    },

    async getBlogById(_id: object): Promise<IdbBlogs | null> {
        const findId = await blogsCollection.findOne({_id})

        return findId ?? null
    },

    async updateBlog(newData: BlogsInput, id: ObjectId): Promise<void> {
        const {name, description, websiteUrl} = newData

        const filter = { _id: id }

        const updateField = {
            $set: {
                name,
                description,
                websiteUrl
            }
        }

        await blogsCollection.updateOne(filter, updateField)
    },

    async deleteBlog(id: ObjectId): Promise<void> {

        await blogsCollection.deleteOne({_id: id})
    },

    async deleteAllBD() {
        db.blogs = [];
    }

}
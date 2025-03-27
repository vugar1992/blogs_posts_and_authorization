import {Request, Response} from "express";
import {IdbBlogs} from "../../db/DBBlogsType";
import {blogsRepository} from "./blogs-repository";
import {ObjectId} from "mongodb";

export type BlogsInput = {
    name: string,
    description: string,
    websiteUrl: string
}

export const blogsController = {

    async getBlogs(req: Request, res: Response): Promise<void> {
        const allBlogs: IdbBlogs[] = await blogsRepository.getBlogs()
        res.status(200).json(allBlogs)
    },

    async createNewBlog(req: Request, res: Response): Promise<void> {

        const createData: BlogsInput = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        const blog = await blogsRepository.createNewBlog(createData)

        res.status(201).json(blog)
    },

    async getBlogById(req: Request, res: Response): Promise<void> {

        const blog: IdbBlogs | null = await blogsRepository.getBlogById(new ObjectId(req.params.id))

        if (!blog) {
            res.sendStatus(404)
            return
        }

        res.status(200).json(blog)
    },

    async updateBlogs(req: Request, res: Response): Promise<void> {

        const updateData: BlogsInput = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        const id = new ObjectId(req.params.id)

        const blog: IdbBlogs | null = await blogsRepository.getBlogById(id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        await blogsRepository.updateBlog(updateData, id)

        res.sendStatus(204)

    },

    async deleteBlog(req: Request, res: Response): Promise<void> {

        const id = new ObjectId(req.params.id)

        const blog: IdbBlogs | null = await blogsRepository.getBlogById(id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        await blogsRepository.deleteBlog(id)

        res.sendStatus(204)
    },

    async deleteAllBD(req: Request, res: Response): Promise<void> {
        await blogsRepository.deleteAllBD()
        res.sendStatus(204)
    }
}
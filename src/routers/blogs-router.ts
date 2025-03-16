import {Router, Request, Response} from "express";
import {db} from "../db/db";
import {blogsRepository} from "../repository/blogs-repository";
import {createValidator, inputValidationResultMiddleware} from "../validator/blogs-validator";


export const blogsRouter:Router = Router({})

export type CreateBlogsInput = {
    name: string,
    description: string,
    websiteUrl: string
}

blogsRouter.get('/', (req:Request, res:Response):void => {
    res.status(200).json(db.blogs)
})

blogsRouter.post('/',
    createValidator,
    inputValidationResultMiddleware,
    (req:Request, res:Response) :void=> {

        const createData:CreateBlogsInput = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        const blog = blogsRepository.createNewBlog(createData)
        // db.blogs.push(blog)
        // res.status(201).json(blog)
        res.sendStatus(201)
})
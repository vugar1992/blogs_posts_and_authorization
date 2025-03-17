import {Router, Request, Response} from "express";
import {db} from "../db/db";
import {blogsRepository} from "../repository/blogs-repository";
import {authorizationMiddleware, createValidator, inputValidationResultMiddleware} from "../validator/blogs-validator";


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
    authorizationMiddleware,
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

blogsRouter.get('/:id',
    (req:Request, res:Response):void => {
        const index = blogsRepository.getBlogById(req.params.id)

        if (index === -1) {
            res.sendStatus(404)
            return
        }

        const blog = db.blogs[index]

        res.status(200).json(blog)
})

blogsRouter.put('/:id',
    authorizationMiddleware,
    createValidator,
    inputValidationResultMiddleware,
    (req:Request, res:Response) :void => {
        const index = blogsRepository.getBlogById(req.params.id)

        if(index === -1) {
            res.sendStatus(404)
            return
        }

        const blog = db.blogs[index];

        const { name, description, websiteUrl } = req.body

        db.blogs[index] = {...blog,
            name,
            description,
            websiteUrl
        }

        res.sendStatus(204)

    })


blogsRouter.delete('/:id',
    authorizationMiddleware,
    (req:Request, res:Response) :void => {
        const index = blogsRepository.getBlogById(req.params.id)

        if(index === -1) {
            res.sendStatus(404)
            return
        }

        db.blogs.splice(index,1)

        res.sendStatus(204)
    })
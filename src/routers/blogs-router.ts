import {Router, Request, Response} from "express";
import {db} from "../db/db";
import {blogsRepository} from "../repository/blogs-repository";
import {authorizationMiddleware, createValidator, inputValidationResultMiddleware} from "../validator/blogs-validator";
import {IdbBlogs} from "../db/DBBlogsType";


export const blogsRouter:Router = Router({})
export const deleteAllBlogsRouter:Router = Router({})

export type BlogsInput = {
    name: string,
    description: string,
    websiteUrl: string
}

blogsRouter.get('/', (req:Request, res:Response):void => {
    const allBlogs:IdbBlogs[] = blogsRepository.getAllBlogs()
    res.status(200).json(allBlogs)
})

blogsRouter.post('/',
    authorizationMiddleware,
    createValidator,
    inputValidationResultMiddleware,
    (req:Request, res:Response) :void=> {

        const createData:BlogsInput = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        blogsRepository.createNewBlog(createData)

        res.sendStatus(201)
})

blogsRouter.get('/:id',
    (req:Request, res:Response):void => {

        const blog:IdbBlogs | null = blogsRepository.getBlogById(req.params.id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        res.status(200).json(blog)
})

blogsRouter.put('/:id',
    authorizationMiddleware,
    createValidator,
    inputValidationResultMiddleware,
    (req:Request, res:Response) :void => {

        const updateData:BlogsInput = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        const blog:IdbBlogs | null = blogsRepository.getBlogById(req.params.id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        blogsRepository.updateBlog(updateData, req.params.id)

        res.sendStatus(204)

    })


blogsRouter.delete('/:id',
    authorizationMiddleware,
    (req:Request, res:Response) :void => {

        const blog:IdbBlogs | null = blogsRepository.getBlogById(req.params.id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        blogsRepository.deleteBlog(req.params.id)

        res.sendStatus(204)
    })


deleteAllBlogsRouter.delete('/all-data', (req:Request, res:Response) :void => {
    blogsRepository.deleteAllBD()
    res.sendStatus(204)
})

import {Router, Request, Response} from "express";
import {blogsRepository} from "../repository/blogs-repository";
import {createValidator} from "../validator/blogs-validator";
import {IdbBlogs} from "../db/DBBlogsType";
import {authorizationMiddleware} from "../middleware/basic-auth";
import {inputValidationResultMiddleware} from "../middleware/errors-type";


export const blogsRouter: Router = Router({})
export const deleteAllBlogsRouter: Router = Router({})

export type BlogsInput = {
    name: string,
    description: string,
    websiteUrl: string
}

blogsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const allBlogs: IdbBlogs[] = await blogsRepository.getAllBlogs()
    res.status(200).json(allBlogs)
})

blogsRouter.post('/',
    authorizationMiddleware,
    createValidator,
    inputValidationResultMiddleware,
    async (req: Request, res: Response): Promise<void> => {

        const createData: BlogsInput = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        const blog = await blogsRepository.createNewBlog(createData)

        res.status(201).json(blog)
    })

blogsRouter.get('/:id',
    async (req: Request, res: Response): Promise<void> => {

        const blog: IdbBlogs | null = await blogsRepository.getBlogById(req.params.id)

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
    async (req: Request, res: Response): Promise<void> => {

        const updateData: BlogsInput = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        const blog: IdbBlogs | null = await blogsRepository.getBlogById(req.params.id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        await blogsRepository.updateBlog(updateData, req.params.id)

        res.sendStatus(204)

    })


blogsRouter.delete('/:id',
    authorizationMiddleware,
    async (req: Request, res: Response): Promise<void> => {

        const blog: IdbBlogs | null = await blogsRepository.getBlogById(req.params.id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        await blogsRepository.deleteBlog(req.params.id)

        res.sendStatus(204)
    })


deleteAllBlogsRouter.delete('/all-data', async (req: Request, res: Response): Promise<void> => {
    await blogsRepository.deleteAllBD()
    res.sendStatus(204)
})

import {Router, Request, Response} from "express";

export const blogsRouter = Router({})

blogsRouter.get('/', (req:Request, res:Response) => {
    res.status(200).send('123')
})
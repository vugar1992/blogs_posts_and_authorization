import {Router, Request, Response} from "express";
import {db} from "../db/db";

export const blogsRouter = Router({})

blogsRouter.get('/', (req:Request, res:Response) => {
    res.status(200).json(db.blogs)
})

blogsRouter.post('/', (req:Request, res:Response) => {

})
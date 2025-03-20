import {Router, Request, Response} from "express";
import {postsRepository} from "../repository/posts-repository";
import {createValidation} from "../validator/posts-validator";
import {IdbBlogs} from "../db/DBBlogsType";
import {blogsRepository} from "../repository/blogs-repository";
import {IdbPosts} from "../db/IdbPosts";
import {authorizationMiddleware} from "../Middleware/basic-auth";
import {inputValidationResultMiddleware} from "../Middleware/errors-type";

export const postRouter: Router = Router({});

export type ReqInputType = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
};

postRouter.get("/", (req: Request, res: Response) => {
    const allPosts = postsRepository.getAllPosts();
    res.status(200).json(allPosts);
});

postRouter.post(
    "/",
    authorizationMiddleware,
    createValidation,
    inputValidationResultMiddleware,
    (req: Request, res: Response) => {
        const createData: ReqInputType = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
        };

        const blog: IdbBlogs | null = blogsRepository.getBlogById(createData.blogId) ?? null

        if (!blog) {
            res.sendStatus(404)
            return
        }

        postsRepository.createNewPosts(createData);

        res.sendStatus(201);
    }
);

postRouter.get("/:id", (req: Request, res: Response) => {
    const post: IdbPosts | null = postsRepository.getPostById(req.params.id);

    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(200).json(post);
})

postRouter.put("/:id",
    authorizationMiddleware,
    createValidation,
    inputValidationResultMiddleware,
    (req: Request, res: Response) => {
        const updateData: ReqInputType = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
        };

        const post: IdbBlogs | null = blogsRepository.getBlogById(updateData.blogId) ?? null

        if (!post) {
            res.sendStatus(404)
            return
        }

        postsRepository.updatePost(updateData, req.params.id)

        res.sendStatus(204)
    })

postRouter.delete("/:id",
    authorizationMiddleware,
    (req: Request, res: Response) => {

        const postId: IdbPosts | null = postsRepository.getPostById(req.params.id);

        if(!postId) {
            res.sendStatus(404)
            return
        }

        postsRepository.deletePost(req.params.id)
        res.sendStatus(204)
    })
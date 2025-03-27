import {Router, Request, Response} from "express";
import {postsRepository} from "./posts-repository";
import {createValidation} from "../../validator/posts-validator";
import {IdbBlogs} from "../../db/DBBlogsType";
import {blogsRepository} from "../blogs/blogs-repository";
import {IdbPosts} from "../../db/IdbPosts";
import {authorizationMiddleware} from "../../middleware/basic-auth";
import {inputValidationResultMiddleware} from "../../middleware/errors-type";

export const postRouter: Router = Router({});
export const deleteAllPostsRouter: Router = Router({})

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
        //@ts-ignore
        const blog: IdbBlogs | null = blogsRepository.getBlogById(createData.blogId) ?? null

        if (!blog) {
            res.sendStatus(404)
            return
        }

        const post = postsRepository.createNewPosts(createData);

        res.status(201).json(post);
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
        //@ts-ignore
        const blog: IdbBlogs | null = blogsRepository.getBlogById(updateData.blogId) ?? null
        const post: IdbPosts | null = postsRepository.getPostById(req.params.id);

        if (!blog || !post) {
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

        if (!postId) {
            res.sendStatus(404)
            return
        }

        postsRepository.deletePost(req.params.id)
        res.sendStatus(204)
    })

deleteAllPostsRouter.delete('/all-data', (req: Request, res: Response) => {
    postsRepository.deleteAllPosts()
})
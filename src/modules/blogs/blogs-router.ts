import {Router} from "express";
import {checkObjectId, createValidator} from "../../validator/blogs-validator";
import {authorizationMiddleware} from "../../middleware/basic-auth";
import {inputValidationResultMiddleware} from "../../middleware/errors-type";
import {blogsController} from "./blogs-controller";


export const blogsRouter: Router = Router({})
export const deleteAllBlogsRouter: Router = Router({})


blogsRouter.get('/', blogsController.getBlogs)

blogsRouter.post('/',
    authorizationMiddleware,
    createValidator,
    inputValidationResultMiddleware,
    blogsController.createNewBlog,
)

blogsRouter.get('/:id',
    checkObjectId,
    inputValidationResultMiddleware,
    blogsController.getBlogById,
)

blogsRouter.put('/:id',
    authorizationMiddleware,
    checkObjectId,
    createValidator,
    inputValidationResultMiddleware,
    blogsController.updateBlogs
)


blogsRouter.delete('/:id',
    checkObjectId,
    authorizationMiddleware,
    blogsController.deleteBlog
)

deleteAllBlogsRouter.delete('/all-data', blogsController.deleteAllBD)

import {db} from "../db/db";
import {IdbBlogs} from "../db/DBBlogsType";
import {ReqInputType} from "../routers/posts-router";
import {IdbPosts} from "../db/IdbPosts";

export const postsRepository = {
    getAllPosts() {
        return db.posts;
    },

    createNewPosts(reqData: ReqInputType): void {
        const {title, shortDescription, content, blogId} = reqData;


        const findName: IdbBlogs | null = db.blogs.find(blog => blogId === blog.id) ?? null;

        if (findName) {
            const newPost: IdbPosts = {
                id: new Date().getTime().toString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: findName.name,
            };

            db.posts.push(newPost);
        }
    },

    getPostById(id: string): IdbPosts | null {
        const index: number = db.posts.findIndex((post: IdbPosts): boolean => post.id === id);

        return db.posts[index] ?? null
    },

    updatePost(reqData: ReqInputType, id: string): void {
        const {title, shortDescription, content, blogId} = reqData;

        const blog: IdbBlogs | null = db.blogs.find((blog: IdbBlogs): boolean => blog.id === blogId) ?? null;

        const index: number = db.posts.findIndex((post: IdbPosts): boolean => post.id === id);

        if (blog) {
            db.posts[index] = {
                ...db.posts[index],
                title,
                shortDescription,
                content,
                blogId,
                blogName: blog.name,
            }
        }
    },

    deletePost(id: string): void {
        db.posts = db.posts.filter((post: IdbPosts): boolean => post.id !== id);
    }

};

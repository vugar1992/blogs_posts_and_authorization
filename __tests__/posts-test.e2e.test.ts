import {app} from "../src/app";
import request from "supertest";
import {BlogsInput} from "../src/routers/blogs-router";

describe("Create and update posts", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data").expect(204);
    })

    it('should create a post', async () => {
        await request(app)
            .get('/posts')
            .expect(200)

        const newBlog: BlogsInput = {
            name: "test name",
            description: "test description",
            websiteUrl: "https://samurai.it-incubator.io/",
        }

        const createBlog = await request(app)
            .post("/blogs")
            .auth('admin', 'qwerty')
            .send(newBlog)

        expect(createBlog.status).toBe(201)

        const getAllBlogs = await request(app)
            .get("/blogs")
            .expect(200)

        const blogId = getAllBlogs.body[0].id;

        const createData = {
            title: 'title post',
            shortDescription: 'description post',
            content: 'content post',
            blogId: blogId,
        }

        const createPost = await request(app)
            .post("/posts")
            .auth('admin', 'qwerty')
            .send(createData)

        expect(createPost.status).toBe(201)

        const getAllPost = await request(app)
            .get("/posts")
            .expect(200)

        expect(getAllPost.body.length).toBe(1)

        const postId = getAllPost.body[0].id;

        await request(app)
            .get(`/posts/${postId}`)
            .expect(200)

    })

    it('should update a post', async () => {

        const getAllPosts = await request(app)
            .get(`/posts`)
            .expect(200)

        const blogId = getAllPosts.body[0].blogId;

        const updateData = {
            title: "update title",
            shortDescription: "update description",
            content: "update content",
            blogId: blogId,
        }

        const updatePost = await request(app)
            .put(`/posts/${getAllPosts.body[0].id}`)
            .auth('admin', 'qwerty')
            .send(updateData)

        expect(updatePost.status).toBe(204)

        const getAllAfterPosts = await request(app)
            .get(`/posts`)
            .expect(200)

        expect(getAllAfterPosts.body[0]).toEqual({
            id: getAllAfterPosts.body[0].id,
            title: updateData.title,
            shortDescription: updateData.shortDescription,
            content: updateData.content,
            blogId: updateData.blogId,
            blogName: getAllAfterPosts.body[0].blogName,
        })

        await request(app)
            .delete(`/posts/${getAllPosts.body[0].id}`)
            .auth('admin', 'qwerty')
            .expect(204)

        const getPostAfterDelete = await request(app)
            .get(`/posts`)
            .expect(200)

        expect(getPostAfterDelete.body.length).toBe(0)

    })

    describe("validation", () => {
        it("should check if validation fails when create", async () => {

            await request(app)
                .post("/blogs")
                .auth('admin', 'qwerty')
                .send({
                    name: "test name",
                    description: "test description",
                    websiteUrl: "https://samurai.it-incubator.io/",
                })

            const getAllBlogs = await request(app)
                .get("/blogs")
                .expect(200)

            const blogId = getAllBlogs.body[0].id;

            const falseValues = await request(app)
                .post("/posts")
                .auth('admin', 'qwerty')
                .send({
                    title: "title check max length, must be no more 30",
                    shortDescription: "",
                    content: "",
                    blogId: blogId
                })

            expect(falseValues.body).toEqual({
                 "errorsMessages": [
                    {
                        "message": "The value length must be between 1 to 30",
                        "field": "title"
                    },
                    {
                        "message": "The value length must be between 1 to 100",
                        "field": "shortDescription"
                    },
                    {
                        "message": "The value length must be between 1 to 1000",
                        "field": "content"
                    }
                ]
            })

            const emptyPost = await request(app)
                .post("/posts")
                .auth('admin', 'qwerty')
                .send({})

            expect(falseValues.status).toBe(400)

            const noAuth = await request(app)
                .post("/posts")
                .send({})

            expect(noAuth.status).toBe(401)

        })

        it("should check if validation fails when create", async () => {
            const getAllBlogs = await request(app)
                .get("/blogs")
                .expect(200)

            const blogId = getAllBlogs.body[0].id;

            const falseValues = await request(app)
                .put(`/posts/${blogId}`)
                .auth('admin', 'qwerty')
                .send({
                    title: "title check max length, must be no more 30",
                    shortDescription: "",
                    content: "",
                    blogId: blogId
                })

            expect(falseValues.status).toBe(400)

            const noAuth = await request(app)
                .put(`/posts/${blogId}`)
                .send({
                    title: "title",
                    shortDescription: "shortDescription",
                    content: "content",
                    blogId: blogId
                })

            expect(noAuth.status).toBe(401)


            const isRequired = await request(app)
                .put(`/posts/${blogId}`)
                .auth('admin', 'qwerty')
                .send({})

            expect(isRequired.body).toEqual( {
                    errorsMessages: [
                        {
                            message: 'Title is required field and must be a string',
                            field: 'title'
                        },
                        {
                            message: 'Short Description is required field and must be a string',
                            field: 'shortDescription'
                        },
                        {
                            message: 'Content is required field and must be a string',
                            field: 'content'
                        },
                        {
                            message: 'Blog id is required field and must be a string',
                            field: 'blogId'
                        }
                    ]
                }
            )

        })

    })

})
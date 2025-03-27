import { app } from "../src/app";
import request from "supertest";
import {BlogsInput} from "../src/modules/blogs/blogs-router";

describe("create and update data", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data").expect(204);
    });

    it("should create a new video", async () => {
        await request(app)
            .get("/blogs")
            .expect(200)

        const newBlog:BlogsInput = {
            name: "test name",
            description: "test description",
            websiteUrl: "https://samurai.it-incubator.io/",
        }

        const createBlog = await request(app)
            .post("/blogs")
            .auth('admin', 'qwerty')
            .send(newBlog)

        expect(createBlog.status).toBe(201)

        const allBlogs = await request(app)
            .get("/blogs")
            .expect(200)

        expect(allBlogs.body.length).toBe(1)

        const blogId:string = allBlogs.body[0].id;

        const getBlogById = await request(app)
            .get(`/blogs/${blogId}`)
            .expect(200)

        expect(getBlogById.body).toEqual({
            id: blogId,
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
        })

    })

    it("should update a video", async () => {

        const updateData:BlogsInput = {
            name: 'name update',
            description: "description update",
            websiteUrl: "https://www.youtube.com/",
        }

        const allBlogs = await request(app)
            .get("/blogs")
            .expect(200)

        const blogId:string = allBlogs.body[0].id;

        await request(app)
            .put(`/blogs/${blogId}`)
            .auth('admin', 'qwerty')
            .send(updateData)

        const getUpdateBlogs = await request(app)
            .get("/blogs")
            .expect(200)

        expect(getUpdateBlogs.body[0]).toEqual({
            id: blogId,
            name: updateData.name,
            description: updateData.description,
            websiteUrl: updateData.websiteUrl,
        })
    })

})

describe("validate", () => {
    it("create validate", async () => {

        const falseValues = await request(app)
            .post("/blogs")
            .auth('admin', 'qwerty')
            .send({
                name: "test name length more 15",
                description: true,
                websiteUrl: "samurai.it-incubator.io",
            })

        expect(falseValues.status).toBe(400)

        const emptyValues = await request(app)
            .post("/blogs")
            .auth('admin', 'qwerty')
            .send({})

        expect(emptyValues.status).toBe(400)

        const zeroLength = await request(app)
            .post("/blogs")
            .auth('admin', 'qwerty')
            .send({
                "name": "",
                "description": "",
                "websiteUrl": ""
            })

        expect(zeroLength.status).toBe(400)
        expect(zeroLength.body).toEqual({
            "errorsMessages": [
                {
                    "message": "The value length must be between 1 to 15",
                    "field": "name"
                },
                {
                    "message": "The value length must be between 1 to 500",
                    "field": "description"
                },
                {
                    "message": "The value length must be between 1 to 100",
                    "field": "websiteUrl"
                }
            ]
        })

    })

    it('update validate', async () => {
        const allBlogs = await request(app)
            .get("/blogs")
            .expect(200)

        const blogId:string = allBlogs.body[0].id;

        const falseValue = await request(app)
            .put(`/blogs/${blogId}`)
            .auth('admin', 'qwerty')
            .send({
                name: "test name length more 15",
                description: true,
                websiteUrl: "samurai.it-incubator.io",
            })

        expect(falseValue.status).toBe(400)

        const emptyValue = await request(app)
            .put(`/blogs/${blogId}`)
            .auth('admin', 'qwerty')
            .send({})

        expect(emptyValue.status).toBe(400)

        const zeroLength = await request(app)
            .put(`/blogs/${blogId}`)
            .auth('admin', 'qwerty')
            .send({
                "name": "",
                "description": "",
                "websiteUrl": ""
            })

        expect(zeroLength.status).toBe(400)
        expect(zeroLength.body).toEqual({
            "errorsMessages": [
                {
                    "message": "The value length must be between 1 to 15",
                    "field": "name"
                },
                {
                    "message": "The value length must be between 1 to 500",
                    "field": "description"
                },
                {
                    "message": "The value length must be between 1 to 100",
                    "field": "websiteUrl"
                }
            ]
        })

    })
})
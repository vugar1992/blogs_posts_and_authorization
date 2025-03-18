import { app } from "../src/app";
import request from "supertest";

describe("create and update data", () => {
    // beforeAll(async () => {
    //     await request(app).delete("/testing/all-data").expect(204);
    // })

    it("should create a new video", async () => {
    //     await request(app)
    //         .get("/blogs")
    //         .expect([])

        const newBlog = {
            name: "test name",
            description: "test description",
            website: "https://www.youtube.com/",
        }

        const createBlog = await request(app)
            .post("/blogs")
            .send(newBlog)

        expect(createBlog.status).toBe(201)
    })


})
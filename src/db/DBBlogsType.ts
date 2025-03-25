import {ObjectId} from "mongodb";

export interface IdbBlogs {
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
}
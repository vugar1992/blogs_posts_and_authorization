import { MongoClient, Collection } from 'mongodb';
import {SETTINGS} from "../settings";
import {IdbBlogs} from "./DBBlogsType";
import {IdbPosts} from "./IdbPosts";

export let postsCollection: Collection<IdbPosts>;
export let blogsCollection: Collection<IdbBlogs>;
// export let blogsCollection: any

export async function runDB(url:string): Promise<boolean> {
    let client = new MongoClient(url);
    let db = client.db(SETTINGS.DB_NAME);

    postsCollection = db.collection<IdbPosts>(SETTINGS.PATH.POSTS)
    blogsCollection = db.collection<IdbBlogs>(SETTINGS.PATH.POSTS)

    try {
        await client.connect()
        await db.command({ping:1})
        console.log('OK')
        return true
    } catch (e) {
        console.log(e)
        await client.close();
        return false
    }
}
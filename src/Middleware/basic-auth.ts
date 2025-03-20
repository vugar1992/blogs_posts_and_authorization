import {NextFunction, Request, Response} from "express";


export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth: string | null = req.headers['authorization'] ?? null;

    if (!auth) {
        res.sendStatus(401)
        return
    }

    const [ authType, token ] = auth.split(" ");

    if(authType !== "Basic") {
        res.sendStatus(401)
        return
    }

    const decodedToken = Buffer.from(token, "base64").toString("utf-8");

    const [ username, password ] = decodedToken.split(":");

    if (username !== "admin" || password !== "qwerty") {
        res.sendStatus(401);
        return;
    }

    next()
}
import {body, FieldValidationError, ValidationError, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

type ValidationErrorType = {
    message: string,
    field: string,
}

const nameValidation = body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({min: 1, max: 15})
    .withMessage("The value length must be between 1 to 15")


const descriptionValidation = body("description")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage("The value length must be between 1 to 500")

const websiteUrlValidation = body("websiteUrl")
    .isString()
    .withMessage("Website must be a string")
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage("The value length must be between 1 to 100")
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage("The value must be website url link")

const formatErrors = (error:ValidationError):ValidationErrorType => {
    const expressError = error as unknown as FieldValidationError

    return {
        message: expressError.msg,
        field: expressError.path
    }
}

export const inputValidationResultMiddleware = (req:Request, res:Response, next:NextFunction) :void=> {
    const errors = validationResult(req)
        .formatWith(formatErrors)
        .array({onlyFirstError: true})

    if(!errors.length) {
        next()
        return
    }

    res.status(400).json({errorsMessages: errors})

}

export const authorizationMiddleware = (req:Request, res:Response, next:NextFunction):void=> {
    const auth = req.headers["authorization"] //отличие req.header("authorization")

    if(!auth) {
        res.sendStatus(401)
        return
    }

    const [authType, token] = auth.split(' ')

    if(authType !== 'Basic') {
        res.sendStatus(401)
        return
    }

        const decodedToken  = Buffer.from(token, 'base64').toString('utf-8')
    const [username, pass] = decodedToken.split(':')

    if(username !== 'admin' || pass !== 'qwerty') {
        res.sendStatus(401)
        return
    }
    next()
}

export const createValidator = [nameValidation, descriptionValidation, websiteUrlValidation]
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
    .withMessage("Maximum length must be a positive number")


const descriptionValidation = body("description")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage("Minimum length must be a positive number")

const websiteUrlValidation = body("websiteUrl")
    .isString()
    .withMessage("Website must be a string")
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage("Maximum length must be a positive number")

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

export const createValidator = [nameValidation, descriptionValidation, websiteUrlValidation]
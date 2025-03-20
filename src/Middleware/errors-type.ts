import {NextFunction, Request, Response} from "express";
import {ValidationError, validationResult} from "express-validator";

type ValidationErrorType = {
    message: string;
    field: string;
};

const formatErrors = (error:ValidationError): ValidationErrorType => {
    const expressError = error as unknown as ValidationError;

    return {
        message: expressError.msg,
        field: expressError.type,
    }
}

export const inputValidationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
        .formatWith(formatErrors)
        .array({onlyFirstError: true});

    if (!errors.length) {
        next()
        return
    }

    res.status(400).json({errorsMessages: errors});
}
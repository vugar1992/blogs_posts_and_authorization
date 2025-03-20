import {body, ValidationChain} from "express-validator";


const nameValidation:ValidationChain = body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({min: 1, max: 15})
    .withMessage("The value length must be between 1 to 15")


const descriptionValidation:ValidationChain = body("description")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage("The value length must be between 1 to 500")

const websiteUrlValidation:ValidationChain = body("websiteUrl")
    .isString()
    .withMessage("Website must be a string")
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage("The value length must be between 1 to 100")
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage("The value must be website url link")

export const createValidator = [nameValidation, descriptionValidation, websiteUrlValidation]
import {
    body,
    ValidationChain,
} from "express-validator";

const titleValidation: ValidationChain = body("title")
    .isString()
    .withMessage("Title is required field and must be a string")
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage("The value length must be between 1 to 30");

const shortDescriptionValidation: ValidationChain = body("shortDescription")
    .isString()
    .withMessage("Short Description is required field and must be a string")
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage("The value length must be between 1 to 100");

const contentValidation = body("content")
    .isString()
    .withMessage("Content is required field and must be a string")
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage("The value length must be between 1 to 1000");

const blogIdValidation = body("blogId")
    .isString()
    .withMessage("Blog id is required field and must be a string")
    .trim();

export const createValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
];

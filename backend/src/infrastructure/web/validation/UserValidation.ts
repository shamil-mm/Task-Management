import Joi from "joi"

export const userRegisterValidation=Joi.object({
    
    name:Joi.string().min(3).max(12).required().messages({
        "string.empty":"Name is required",
        "string.min":"Name must be at least 3 characters long",
        "string.max":"Name must not exceed 12 characters"
    }),
    email:Joi.string().email().required().messages({
        "string.empty":"Email is required" ,
        "string.email":"Email must be valid",
    }),
    password:Joi.string().min(6).max(10).required().messages({
        "string.empty":"Password is required",
        "string.min":"Password must be at least 6 characters long",
        "string.max":"Password must not exceed 10 characters"
    })
})

export const userLoginValidation=Joi.object({

    email:Joi.string().email().required().messages({
        "string.empty":"Email is required" ,
        "string.email":"Email must be valid",
    }),
    password:Joi.string().min(6).max(10).required().messages({
        "string.empty":"Password is required",
        "string.min":"Password must be at least 6 characters long",
        "string.max":"Password must not exceed 10 characters"
    })
})
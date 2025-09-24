import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),
  description: Joi.string().min(8).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
  })
});


export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.min": "Title must be at least 3 characters",
  }),
  description: Joi.string().min(5).optional().messages({
    "string.min": "Description must be at least 5 characters",
  })
});

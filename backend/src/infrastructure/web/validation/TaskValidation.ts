import Joi from "joi";

export const createTaskSchema = Joi.object({
   userId: Joi.string().required().messages({
    'string.empty': `"userId" cannot be empty`,
    'any.required': `"userId" is required`
  }),
  title: Joi.string().min(3).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),
  description: Joi.string().min(8).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 8 characters",
  }),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .required()
    .messages({
      "any.only": "Status must be one of: pending, in-progress, completed",
      "any.required": "Status is required",
    }),
  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH")
    .required()
    .messages({
      "any.only": "Priority must be one of: LOW, MEDIUM, HIGH",
      "any.required": "Priority is required",
    }),
  dueDate: Joi.date().iso().required().messages({
    "any.required": "Due date is required",
    "date.base": "Due date must be a valid date",
    "date.format": "Due date must be in ISO format (YYYY-MM-DD)",
  })
});


export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.min": "Title must be at least 3 characters",
  }),

  description: Joi.string().min(5).optional().messages({
    "string.min": "Description must be at least 5 characters",
  }),

  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .optional()
    .messages({
      "any.only": "Status must be one of: pending, in-progress, completed",
    }),

  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH")
    .optional()
    .messages({
      "any.only": "Priority must be one of: LOW, MEDIUM, HIGH",
    }),

  dueDate: Joi.date().iso().optional().messages({
    "date.base": "Due date must be a valid date",
    "date.format": "Due date must be in ISO format (YYYY-MM-DD)",
  }),
});
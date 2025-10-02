import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(3).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),
  description: Joi.string().trim().min(5).max(50).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
    "string.max": "Description must be at maximum 50 characters",
  }),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .required()
    .messages({
      "any.only": "Status must be one of pending, in-progress, or completed",
      "string.empty": "Status is required",
    }),
  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH")
    .required()
    .messages({
      "any.only": "Priority must be one of LOW, MEDIUM, or HIGH",
      "string.empty": "Priority is required",
    }),
  dueDate: Joi.date().min('now').required().messages({
    "date.empty": "Due date is required",
    "date.base": "Due date must be a valid date",
    "date.min": "Due date cannot be in the past",
  }),
});


export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(3).optional().messages({
    "string.min": "Title must be at least 3 characters",
  }),
  description: Joi.string().trim().min(5).optional().messages({
    "string.min": "Description must be at least 5 characters",

  }),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .optional()
    .messages({
      "any.only": "Status must be one of pending, in-progress, or completed",
    }),
  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH")
    .optional()
    .messages({
      "any.only": "Priority must be one of LOW, MEDIUM, or HIGH",
    }),
  dueDate: Joi.date().optional().messages({
    "date.base": "Due date must be a valid date",
  }),
});


import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(2).max(255).allow(""),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email address.",
      "string.empty": "Email cannot be empty.",
      "any.required": "Email is required.",
      "any.unique": "Email address is already in use.", // Custom message for uniqueness
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})"
      )
    )
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "The password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      "string.empty": "Password cannot be empty.",
      "any.required": "Password is required.",
    }),

  imageUrl: Joi.string().min(6).max(1024).allow(""),
  imageAlt: Joi.string().min(6).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(1).max(256).required(),
  zip: Joi.number()
    .integer()
    .positive()
    .min(1)
    .max(99999999)
    .allow("")
    .default(1),

  phone: Joi.string().min(9).max(14).required(),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;

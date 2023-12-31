import Joi from "joi";

import validation from "./validation";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })

    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .messages({
      "string.empty": "the password should not be empty",
      "string.pattern.base":
        "The password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
    })
    .min(6)
    .max(10)
    .required(),
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

export default validateLoginSchema;

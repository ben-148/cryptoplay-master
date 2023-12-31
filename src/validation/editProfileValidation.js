import Joi from "joi";

import validation from "./validation";

const editProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(2).max(255).allow(""),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  imageUrl: Joi.string().min(6).max(1024).allow(""),
  imageAlt: Joi.string().min(6).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  amount: Joi.number().min(0).max(99999999).allow("").optional(),
  portfolio: Joi.array().items(Joi.object()),
  houseNumber: Joi.string().min(1).max(256).required(),
  zip: Joi.number().min(0).max(99999999).allow("").optional(),
  phone: Joi.string().min(7).max(14).required(),
});

const validateEditProfileSchema = (userInput) =>
  validation(editProfileSchema, userInput);

export default validateEditProfileSchema;

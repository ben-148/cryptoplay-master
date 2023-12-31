import Joi from "joi";

import validation from "./validation";

const editCoinSchema = Joi.object({
  name: Joi.string().min(2).max(256).required(),
  codeName: Joi.string().min(2).max(256).required(),
  price: Joi.number().min(0).max(99999999).required(),
  change24: Joi.number().min(-99999999).max(99999999),
  description: Joi.string().min(10).max(1000),

  url: Joi.string()
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
    .required()
    .messages({
      "string.pattern.base": "the link is not fit to the system",
    }),

  alt: Joi.string().min(2).max(256).allow(""),
});

const editCoinParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCoinSchema, userInput);

const validateEditCoinParamsSchema = (userInput) =>
  validation(editCoinParamsSchema, userInput);

export { validateEditCoinParamsSchema };

export default validateEditSchema;

import Joi from "joi";

export const userRegisterValidator = Joi.object({
	firstName: Joi.string().alphanum().required(),
	lastName: Joi.string().alphanum().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const userLoginValidator = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

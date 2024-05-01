import Joi from "joi";

export const taskCreateValidator = Joi.object({
	text: Joi.string().required(),
});

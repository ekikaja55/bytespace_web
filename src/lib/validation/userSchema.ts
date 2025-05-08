import Joi from 'joi';
export const createUserSchema = Joi.object({
  user_name: Joi.string().required().messages({
    'string.base': '"user_name" must be text',
    'any.required': '"user_name" must be filled',
  }),
  user_email: Joi.string().email().required().messages({
    'string.base': '"user_email" must be text',
    'string.email': '"user_email" must be a valid email',
    'any.required': '"user_email" must be filled',
  }),
  user_password: Joi.string().min(8).required().messages({}),
  user_gender: Joi.string().valid('male', 'female').required().messages({}),
  user_date_birth: Joi.date().iso().required().messages({}),
});

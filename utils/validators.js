const Joi = require('joi');

const emailSchema = Joi.string().email().required().messages({
  'string.email': 'Please provide a valid email address',
  'any.required': 'Email is required'
});

const passwordSchema = Joi.string()
  .min(8)
  .max(100)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
  .required();

module.exports = {
  validateRegisterInput: (data) => Joi.object({
    email: emailSchema,
    password: passwordSchema,
    firstName: Joi.string().trim().max(100).required(),
    lastName: Joi.string().trim().max(100).required()
  }).validate(data, { abortEarly: false }),

  validateLoginInput: (data) => Joi.object({
    email: emailSchema,
    password: Joi.string().required()
  }).validate(data, { abortEarly: false })
};
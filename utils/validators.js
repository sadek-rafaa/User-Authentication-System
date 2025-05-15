const Joi = require('joi');

const emailSchema = Joi.string().email().required().messages({
  'string.email': 'Please provide a valid email address',
  'any.required': 'Email is required'
});

const passwordSchema = Joi.string()
  .min(8)
  .max(100)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required'
  });

module.exports = {
  validateRegisterInput: (data) => {
    return Joi.object({
      email: emailSchema,
      password: passwordSchema,
      firstName: Joi.string().trim().max(100).required(),
      lastName: Joi.string().trim().max(100).required()
    }).validate(data, { abortEarly: false });
  },
  // Add other validation schemas as needed
};
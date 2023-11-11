import Joi from "joi";
import User from "../../types/User.js";

const userValidation = (user: User) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': `user "email" cannot be an empty field`,
        'string.email': 'user "email" must be a valid email',
        'any.required': `user "email" is a required field`,
      }),
    password: Joi.string()
      .required()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{7,20}$)/)
      .messages({
        'string.empty': `user "password" cannot be an empty field`,
        'any.required': `user "password" is a required field`,
        'string.pattern.base': `user "password" must be between 7 and 20 characters, contain at least one numeric digit, one uppercase and one lowercase letter, and one special character`,
        }),
  });
  return schema.validate(user);
};

export default userValidation;

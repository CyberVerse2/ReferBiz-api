import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  businessName: Joi.string().min(3).max(30),
  socialLink: Joi.string().uri(),
  accountNumber: Joi.number()
}).options({ abortEarly: false });

export default userSchema;

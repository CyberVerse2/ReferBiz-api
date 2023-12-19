import Joi from 'joi';

const authSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }),
  businessName: Joi.string().min(3).max(30),
  socialLink: Joi.string().uri(),
  accountNumber: Joi.number().min(1000000000).max(9999999999),
  password: Joi.string().min(6).max(30).required()
}).options({ abortEarly: false });

export default authSchema;

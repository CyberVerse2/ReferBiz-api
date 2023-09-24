import Joi from "joi";

const authSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  })
}).options({ abortEarly: false });

export default authSchema;

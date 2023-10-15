import Joi from 'joi';

const campaignSchema = Joi.object({
  name: Joi.string().min(3).max(70).required(),
  description: Joi.string().min(3).max(255),
  // reward_details: Joi.string().min(3).max(30).required(),
  paymentLink: Joi.string().uri().required(),
  campaignLink: Joi.string().uri().required()
  // referrer_amount: Joi.
}).options({ abortEarly: false });

export default campaignSchema;

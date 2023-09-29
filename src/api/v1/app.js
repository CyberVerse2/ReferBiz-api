import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import crypto from 'crypto';
import helmet from 'helmet';

import { errorHandler } from './globals/middlewares/errorHandler.middleware.js';
import appendObj from './globals/middlewares/appendObj.middlewares.js';

import api from './api.js';
import asyncHandler from 'express-async-handler';
import { AuthenticationError } from './globals/utils/errors.util.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use('/api/v1', api);
app.use(errorHandler);

app.get(
  'webhook/url',
  asyncHandler((req, res) => {
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash != req.headers['x-paystack-signature'])
      throw new AuthenticationError('The paystack hash is invalid');
    const event = req.body;
    return res
      .status(200)
      .json({ message: 'Webhook retrieval succesful', data: event });
  })
);

export default app;

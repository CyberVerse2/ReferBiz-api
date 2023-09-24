import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './globals/middlewares/errorHandler.middleware.js';


import api from './api.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use('/api/v1', api);
app.use(errorHandler);

export default app;

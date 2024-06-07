import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();
import usersRoutes from './routes/users-routes';
import userRoutes from './routes/user-routes';
import authRoutes from './routes/auth-routes';
import placesRoutes from './routes/places-routes';

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { errorMiddleware } from './middlewares/error-middleware';
import { ENV } from './constants';

const app = express();
const port = 3030;

mongoose
  .connect(process.env.DATABASE_URL ?? '')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(
  cors({
    origin: ENV.CLIENT_ENDPOINT,
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api/user', userRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/auth', authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).send('Sorry cant find that!');
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

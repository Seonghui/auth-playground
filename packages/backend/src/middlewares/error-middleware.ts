import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../models/http-error';

export const errorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
};

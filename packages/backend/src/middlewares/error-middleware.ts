import { Request, Response } from 'express';
import { HttpError } from '../models/http-error';

export const errorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
) => {
  res.status(error.status || 500);
  res.json({ message: error.message || '알 수 없는 오류가 발생했습니다.' });
};

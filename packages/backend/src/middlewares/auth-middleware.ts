import { Response, Request, NextFunction } from 'express';
import { verfiyAccessToken } from '../utils/jwt-util';
import { HttpError } from '../models/http-error';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || !token?.length) {
    const error = new HttpError(404, '인증 헤더가 없습니다.');
    return next(error);
  }

  const response = await verfiyAccessToken(token);

  console.log({ response });
  next();
}

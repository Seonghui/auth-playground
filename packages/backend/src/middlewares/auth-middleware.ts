import { Response, Request, NextFunction } from 'express';
import { IUserToken, verfiyAccessToken } from '../utils/jwt-util';
import { TokenExpiredError } from 'jsonwebtoken';
import { HttpError } from '../models/http-error';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token || !token?.length) {
      throw new HttpError(404, '인증 헤더가 없습니다.');
    }

    const response = verfiyAccessToken(token ?? '') as IUserToken;
    if (!response.email || !response.id) {
      throw new HttpError(404, '유저 정보가 없습니다.');
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      if (error.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ message: 'Access Token이 만료되었습니다.' });
      }
    }

    if (error instanceof HttpError) {
      return res
        .status(error.status ?? 500)
        .json({ message: error.message ?? '인증 에러가 발생했습니다.' });
    }
    return res.status(404).json({ message: '인증 에러가 발생했습니다.' });
  }
}

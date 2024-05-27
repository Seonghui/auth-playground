import { Response, Request, NextFunction } from 'express';
import User from '../models/user';
import { HttpError } from '../models/http-error';
import { IUserToken, verfiyAccessToken } from '../utils/jwt-util';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const jwtDecoded = verfiyAccessToken(token ?? '') as IUserToken;
    const existingUser = await User.findOne(
      { _id: jwtDecoded.id },
      '-password',
    );
    if (!existingUser) {
      const error = new HttpError(404, '유저를 찾을 수 없습니다.');
      return next(error);
    }
    res.status(200).json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    });
  } catch (err) {
    const error = new HttpError(500, '오류가 발생했습니다.');
    return next(error);
  }
};

export default {
  getUser,
};

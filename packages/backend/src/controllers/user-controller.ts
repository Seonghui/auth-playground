import { Response, Request, NextFunction } from 'express';
import User from '../models/user';
import { HttpError } from '../models/http-error';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'This is a protected route' });
  //   res.json({ message: 'This is a protected route', user: req.user });

  //   const token = req.headers.authorization;
  //   let existingUser;
  //   try {
  //     const jwtDecoded: any = jwt.verify(
  //       token ?? '',
  //       process.env.ACCESS_TOKEN_SECRET ?? '',
  //     );
  //     //   existingUser = await User.findOne({ id: decoded?.userId });
  //     existingUser = await User.findOne({ id: jwtDecoded.id }, '-password');
  //     if (!existingUser) {
  //       const error = new HttpError(404, '유저를 찾을 수 없습니다.');
  //       return next(error);
  //     }
  //     res.status(200).json({
  //       id: existingUser.id,
  //       username: existingUser.username,
  //       email: existingUser.email,
  //       token,
  //     });
  //   } catch (err) {
  //     const error = new HttpError(500, '오류가 발생했습니다.');
  //     return next(error);
  //   }
};

export default {
  getUser,
};

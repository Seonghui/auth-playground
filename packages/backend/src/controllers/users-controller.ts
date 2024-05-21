import { Response, Request, NextFunction } from 'express';
import User from '../models/user';
import { HttpError } from '../models/http-error';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      500,
      '로그인에 실패했습니다. 다시 시도해 주세요.',
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(422, '이미 등록된 email 입니다.');
    return next(error);
  }

  try {
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    const error = new HttpError(
      500,
      '로그인에 실패했습니다. 다시 시도해 주세요.',
    );
    return next(error);
  }
};

export default {
  signup,
};

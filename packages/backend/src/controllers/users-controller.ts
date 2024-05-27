import { Response, Request, NextFunction } from 'express';
import User from '../models/user';
import { HttpError } from '../models/http-error';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt-util';
import Token from '../models/token';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let existingUser;
  let isValidPassword = false;

  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const error = new HttpError(403, '유저가 존재하지 않습니다.');
      return next(error);
    }
    isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      const error = new HttpError(403, '비밀번호가 일치하지 않습니다.');
      return next(error);
    }
    const userData = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    await Token.findOneAndUpdate(
      { email: existingUser.email },
      { token: refreshToken },
      { upsert: true },
    );

    res.status(201).json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    const error = new HttpError(
      500,
      '로그인에 실패했습니다. 다시 시도해 주세요.',
    );
    return next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  let existingUser;
  let hashedPassword;

  try {
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new HttpError(422, '이미 등록된 email 입니다.');
      return next(error);
    }
    hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const userData = {
      id: savedUser.id,
      email: savedUser.email,
    };

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    await Token.findOneAndUpdate(
      { email: savedUser.email },
      { token: refreshToken },
      { upsert: true },
    );

    res.status(201).json({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    const error = new HttpError(
      500,
      '오류가 발생했습니다. 다시 시도해 주세요.',
    );
    return next(error);
  }
};

export default {
  register,
  login,
};

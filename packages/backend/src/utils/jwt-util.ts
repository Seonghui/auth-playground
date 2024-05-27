import jwt from 'jsonwebtoken';
import { ENV } from '../constants';

export interface IUserToken {
  email: string;
  id: string;
}

export function generateAccessToken(user: IUserToken) {
  return jwt.sign(user, ENV.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

export function generateRefreshToken(user: IUserToken) {
  return jwt.sign(user, ENV.REFRESH_TOKEN_SECRET);
}

export function verfiyAccessToken(token: string) {
  return jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, ENV.REFRESH_TOKEN_SECRET);
}

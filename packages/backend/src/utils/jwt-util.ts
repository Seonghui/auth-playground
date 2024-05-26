import jwt from 'jsonwebtoken';
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? '';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? '';

export interface IUserToken {
  email: string;
  id: string;
}

export function generateAccessToken(user: IUserToken) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(user: IUserToken) {
  return jwt.sign(user, REFRESH_TOKEN_SECRET);
}

export function verfiyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

import { Response, Request } from 'express';
import Token from '../models/token';
import {
  IUserToken,
  generateAccessToken,
  verifyRefreshToken,
} from '../utils/jwt-util';

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const tokenDoc = await Token.findOne({ token: refreshToken });
  if (!tokenDoc) {
    return res.sendStatus(403);
  }

  const verifyResponse = verifyRefreshToken(refreshToken) as IUserToken;

  const userData = {
    id: verifyResponse.id,
    email: verifyResponse.email,
  };

  const accessToken = generateAccessToken(userData);
  res.json({ accessToken });
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  await Token.findOneAndDelete({ token: refreshToken });
  res.sendStatus(204);
};

export default {
  logout,
  refreshToken,
};

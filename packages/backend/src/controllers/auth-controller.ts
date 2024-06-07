import { Response, Request } from 'express';
import Token from '../models/token';
import {
  IUserToken,
  generateAccessToken,
  verifyRefreshToken,
} from '../utils/jwt-util';

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

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

export default {
  refreshToken,
};

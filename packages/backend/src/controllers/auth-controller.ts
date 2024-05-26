import { Response, Request } from 'express';
import Token from '../models/token';
import { generateAccessToken, verifyRefreshToken } from '../utils/jwt-util';

const refreshToken = async (req: Request, res: Response) => {
  console.log('타나요');
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const tokenDoc = await Token.findOne({ token: refreshToken });
  if (!tokenDoc) {
    return res.sendStatus(403);
  }

  const verifyResponse: any = await verifyRefreshToken(refreshToken);

  const userData = {
    id: verifyResponse.id,
    email: verifyResponse.email,
  };

  console.log(verifyResponse);

  const accessToken = generateAccessToken(userData);
  res.json({ accessToken });
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  console.log(refreshToken);
  await Token.findOneAndDelete({ token: refreshToken });
  res.sendStatus(204);
};

export default {
  logout,
  refreshToken,
};

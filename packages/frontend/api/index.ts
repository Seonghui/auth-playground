import { TokenUtil } from '@/utils/tokenUtil';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 1000,
});

instance.interceptors.request.use(
  request => {
    const accessToken = TokenUtil.getToken();
    if (!!accessToken) {
      request.headers['Authorization'] = `bearer ${accessToken}`;
      request.headers['accept'] = 'application/json';
    }
    return request;
  },
  err => Promise.reject(err),
);

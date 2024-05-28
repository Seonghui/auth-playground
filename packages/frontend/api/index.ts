import { TokenUtil } from '@/utils/tokenUtil';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 1000,
  withCredentials: true,
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

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          'http://localhost:3030/api/auth/refresh',
          {},
          { withCredentials: true },
        );
        TokenUtil.setToken(data.accessToken);
        instance.defaults.headers.common['Authorization'] =
          `bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // handle refresh token error, e.g., logout user
        TokenUtil.removeToken();
        window.location.href = '/login'; // redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

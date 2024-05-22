import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 1000,
});

instance.interceptors.request.use(
  request => {
    if (!!localStorage.getItem('token')) {
      request.headers['Authorization'] = `${localStorage.getItem('token')}`;
      request.headers['accept'] = 'application/json';
    }
    return request;
  },
  err => Promise.reject(err),
);

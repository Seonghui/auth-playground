import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 1000,
});

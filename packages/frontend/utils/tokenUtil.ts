export const TokenUtil = {
  getToken: () => {
    return localStorage.getItem('token') ?? '';
  },
  setToken: (token: string) => {
    window.localStorage.setItem('token', token);
  },
  removeToken: () => {
    window.localStorage.removeItem('token');
  },
};

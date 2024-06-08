export const TokenUtil = {
  getToken: () => {
    if (typeof window === 'undefined') {
      return;
    }
    return localStorage.getItem('token') ?? '';
  },
  setToken: (token: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem('token', token);
  },
  removeToken: () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.removeItem('token');
  },
};

import { instance } from '.';

export const authApi = {
  postLogout: async () => {
    const { data } = await instance.post(
      '/api/auth/logout',
      {},
      { withCredentials: true },
    );
    return data;
  },
};

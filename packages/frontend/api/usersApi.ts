import { ILoginInput, IRegisterInput } from '@/types/api';
import { instance } from '.';

const usersApi = {
  postRegister: async (newUser: IRegisterInput) => {
    const { data } = await instance.post(
      '/api/users/register',
      { ...newUser },
      { withCredentials: true },
    );
    return data;
  },
  postLogin: async (user: ILoginInput) => {
    const { data } = await instance.post(
      '/api/users/login',
      { ...user },
      { withCredentials: true },
    );
    return data;
  },
  postLogout: async () => {
    const { data } = await instance.post(
      '/api/users/logout',
      {},
      { withCredentials: true },
    );
    return data;
  },
  getUser: async () => {
    const { data } = await instance.get('/api/users/me', {
      withCredentials: true,
    });
    return data;
  },
};

export default usersApi;

import { ILoginInput, IRegisterInput } from '@/types/api';
import { instance } from '.';

const userApi = {
  postRegister: async (newUser: IRegisterInput) => {
    const { data } = await instance.post('/api/users/register', { ...newUser });
    return data;
  },
  postLogin: async (user: ILoginInput) => {
    const { data } = await instance.post('/api/users/login', { ...user });
    return data;
  },
};

export default userApi;

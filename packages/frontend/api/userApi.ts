import { instance } from '.';

const userApi = {
  getUser: async () => {
    const { data } = await instance.get('/api/user', { withCredentials: true });
    return data;
  },
};

export default userApi;

import { IPlaceInput } from '@/src/types/api';
import { instance } from '.';

export const placeApi = {
  getPlaces: async () => {
    const { data } = await instance.get('/api/places', {
      withCredentials: true,
    });
    return data;
  },
  getPlacesByUser: async () => {
    const { data } = await instance.get(`/api/places/me`, {
      withCredentials: true,
    });
    return data;
  },
  addPlaces: async (place: IPlaceInput) => {
    const { data } = await instance.post(
      '/api/places',
      { ...place },
      { withCredentials: true },
    );
    return data;
  },
};

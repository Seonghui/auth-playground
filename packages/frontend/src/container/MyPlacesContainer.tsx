'use client';

import { placeApi } from '@/src/api/placeAPI';
import PlaceList from '@/src/component/service/PlaceList';
import useUserStore, { IUserStore } from '@/src/store/userStore';
import { IPlaceResponse } from '@/src/types/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function MyPlacesContainer() {
  const { user } = useUserStore<IUserStore>(state => state);
  const { data } = useQuery<IPlaceResponse>({
    queryKey: ['getMyPlaces'],
    queryFn: () => placeApi.getPlacesByUser(),
    enabled: !!user,
  });

  return <PlaceList places={data?.places} />;
}

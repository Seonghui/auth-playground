'use client';

import { placeApi } from '@/api/placeAPI';
import PlaceList from '@/component/service/PlaceList';
import useUserStore, { IUserStore } from '@/store/userStore';
import { IPlaceResponse } from '@/types/api';
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

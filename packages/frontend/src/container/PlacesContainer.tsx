'use client';

import { placeApi } from '@/src/api/placeAPI';
import PlaceList from '@/src/component/service/PlaceList';
import useUserStore, { IUserStore } from '@/src/store/userStore';
import { IPlace, IPlaceResponse } from '@/src/types/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

export default function PlacesContainer() {
  const { data } = useQuery<IPlaceResponse>({
    queryKey: ['getPlaces'],
    queryFn: placeApi.getPlaces,
  });

  return (
    <div>
      <PlaceList places={data?.places} />
    </div>
  );
}

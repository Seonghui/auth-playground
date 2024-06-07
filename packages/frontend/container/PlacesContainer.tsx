'use client';

import { placeApi } from '@/api/placeAPI';
import PlaceList from '@/component/service/PlaceList';
import useUserStore, { IUserStore } from '@/store/userStore';
import { IPlace, IPlaceResponse } from '@/types/api';
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

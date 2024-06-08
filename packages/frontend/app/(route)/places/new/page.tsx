'use client';

import { placeApi } from '@/api/placeAPI';
import { IPlaceInput } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const { register, handleSubmit, watch } = useForm<IPlaceInput>();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: placeApi.addPlaces,
    onSuccess: response => {
      router.back();
    },
  });

  const onSubmit: SubmitHandler<IPlaceInput> = data => {
    mutate(data);
  };

  function placesSearchCB(data: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(data);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      //   var bounds = new kakao.maps.LatLngBounds();
      //   for (var i = 0; i < data.length; i++) {
      //     displayMarker(data[i]);
      //     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      //   }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      //   map.setBounds(bounds);
    }
  }

  const handleClickSearchPlace = () => {
    var ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(watch('title'), placesSearchCB);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title', { required: true })}
        placeholder="title"
      ></input>
      <button type="button" onClick={handleClickSearchPlace}>
        장소 찾기
      </button>
      <br />
      <input {...register('description')} placeholder="description"></input>
      <br />
      <input {...register('image')} placeholder="image"></input>
      <br />
      <input type="submit" />
    </form>
  );
}

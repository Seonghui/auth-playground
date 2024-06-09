'use client';

import { useModal } from '@/context/ModalContext';
import { placeApi } from '@/src/api/placeAPI';
import Confirm from '@/src/component/common/Confirm';
import Radio from '@/src/component/common/Radio';
import { IPlaceInput } from '@/src/types/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem>();
  const { addModal, removeModal } = useModal();
  const { register, handleSubmit, watch } = useForm<IPlaceInput>();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: placeApi.addPlaces,
    onSuccess: response => {
      router.back();
    },
  });

  const onSubmit: SubmitHandler<IPlaceInput> = data => {
    mutate({
      ...data,
      address: selectedPlace?.address_name,
      location: {
        lat: Number(selectedPlace?.x),
        lng: Number(selectedPlace?.y),
      },
    });
  };

  const handleConfirmPlace = (
    list: kakao.maps.services.PlacesSearchResult,
    id: string,
  ) => {
    const result = list.find(place => place.id === id);
    setSelectedPlace(result);
    removeModal();
  };

  const keywordSearchCallback = (
    data: kakao.maps.services.PlacesSearchResult,
    status: kakao.maps.services.Status,
  ) => {
    let selectedPlaceId: string = '';
    if (status === window.kakao.maps.services.Status.OK) {
      const handleRadioChange = (value: string) => {
        selectedPlaceId = value;
      };

      const content = data.map(item => {
        return (
          <Radio value={item.id} key={item.id}>
            <div>{item.place_name}</div>
            <div>{item.address_name}</div>
          </Radio>
        );
      });
      addModal(
        <Confirm
          content={
            <Radio.Group onChange={handleRadioChange}>{content}</Radio.Group>
          }
          onClose={() => {
            removeModal();
          }}
          onCloseLabel="취소"
          onConfirmLabel="삭제"
          onConfirm={() => handleConfirmPlace(data, selectedPlaceId)}
        />,
      );
    }
  };

  const handleClickSearchPlace = () => {
    var ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(watch('title'), keywordSearchCallback);
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

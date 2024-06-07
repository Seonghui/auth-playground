'use client';

import { placeApi } from '@/api/placeAPI';
import { IPlaceInput } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const { register, handleSubmit } = useForm<IPlaceInput>();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title', { required: true })}
        placeholder="title"
      ></input>
      <br />
      <input {...register('description')} placeholder="description"></input>
      <br />
      <input {...register('image')} placeholder="image"></input>
      <br />
      <input type="submit" />
    </form>
  );
}

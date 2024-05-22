'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import usersApi from '@/api/usersApi';
import { useRouter } from 'next/navigation';
import { IRegisterInput } from '@/types/api';

export default function Page() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IRegisterInput>();
  const { mutate } = useMutation({
    mutationFn: usersApi.postRegister,
    onSuccess: response => {
      router.push('/');
    },
  });

  const onSubmit: SubmitHandler<IRegisterInput> = data => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', { required: true })}
        placeholder="username"
      />
      <br />

      <input {...register('email', { required: true })} placeholder="email" />

      <br />
      <input
        {...register('password', { required: true })}
        placeholder="password"
      />

      <br />
      <input type="submit" />
    </form>
  );
}

'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import usersApi from '@/api/usersApi';
import { useRouter } from 'next/navigation';
import { ILoginInput } from '@/types/api';
import useUserStore from '@/store/userStore';

export default function Page() {
  const router = useRouter();

  const { setUser } = useUserStore();
  const { register, handleSubmit } = useForm<ILoginInput>();
  const { mutate } = useMutation({
    mutationFn: usersApi.postLogin,
    onSuccess: response => {
      router.push('/');
      setUser(response);
    },
  });
  const onSubmit: SubmitHandler<ILoginInput> = data => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} placeholder="email" />

        <br />
        <input
          {...register('password', { required: true })}
          placeholder="password"
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

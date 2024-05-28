'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import usersApi from '@/api/usersApi';
import { useRouter } from 'next/navigation';
import { IRegisterInput } from '@/types/api';
import { TokenUtil } from '@/utils/tokenUtil';
import userApi from '@/api/userApi';
import useUserStore from '@/store/userStore';

export default function Page() {
  const accessToken = TokenUtil.getToken();
  const router = useRouter();

  const { setUser } = useUserStore();

  const { data } = useQuery({
    queryKey: ['getUser'],
    queryFn: userApi.getUser,
    enabled: !!accessToken,
  });
  const { register, handleSubmit } = useForm<IRegisterInput>();
  const { mutate } = useMutation({
    mutationFn: usersApi.postRegister,
    onSuccess: response => {
      TokenUtil.setToken(response.accessToken);
    },
  });

  const onSubmit: SubmitHandler<IRegisterInput> = data => {
    mutate(data);
  };

  useEffect(() => {
    if (!data || !accessToken) {
      return;
    }
    setUser(data);
    router.push('/');
  }, [data, router, setUser, accessToken]);

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
function setUser(data: any) {
  throw new Error('Function not implemented.');
}

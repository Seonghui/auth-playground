'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import usersApi from '@/src/api/usersApi';
import { useRouter } from 'next/navigation';
import { ILoginInput } from '@/src/types/api';
import useUserStore from '@/src/store/userStore';
import { TokenUtil } from '@/src/utils/tokenUtil';

export default function Page() {
  const accessToken = TokenUtil.getToken();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['getUser'],
    queryFn: usersApi.getUser,
    enabled: !!accessToken,
  });

  const { setUser } = useUserStore();
  const { register, handleSubmit } = useForm<ILoginInput>();
  const { mutate } = useMutation({
    mutationFn: usersApi.postLogin,
    onSuccess: response => {
      TokenUtil.setToken(response.accessToken);
    },
  });
  const onSubmit: SubmitHandler<ILoginInput> = data => {
    mutate(data);
  };

  useEffect(() => {
    if (!data || !accessToken) {
      return;
    }
    setUser(data);
    router.push('/');
  }, [data, setUser, router, accessToken]);

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

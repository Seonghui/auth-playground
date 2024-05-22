'use client';
import userApi from '@/api/userApi';
import useUserStore, { IUserStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Page() {
  const { user } = useUserStore<IUserStore>(state => state);

  const { data } = useQuery({
    queryKey: ['getUser'],
    queryFn: userApi.getUser,
  });

  console.log(data);

  return (
    <div>
      <div>마이 page</div>
      <div>{user?.username}님 반갑습니다.</div>
    </div>
  );
}

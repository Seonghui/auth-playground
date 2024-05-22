'use client';
import useUserStore, { IUserStore } from '@/store/userStore';
import React from 'react';

export default function Page() {
  const { user } = useUserStore<IUserStore>(state => state);

  return (
    <div>
      <div>마이 page</div>
      <div>{user?.username}님 반갑습니다.</div>
    </div>
  );
}

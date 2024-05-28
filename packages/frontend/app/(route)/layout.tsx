'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import useUserStore from '@/store/userStore';
import { Fragment } from 'react';
import { TokenUtil } from '@/utils/tokenUtil';
import { authApi } from '@/api/authAPi';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mutate } = useMutation({
    mutationFn: authApi.postLogout,
    onSuccess: () => {
      TokenUtil.removeToken();
      resetUser();
    },
  });

  const { resetUser, user } = useUserStore();
  const handleClickLogout = () => {
    mutate();
  };
  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>
            <Link href="/places">장소</Link>
          </li>
          {!user && (
            <Fragment>
              <li>
                <Link href="/login">로그인</Link>
              </li>
              <li>
                <Link href="/register">회원가입</Link>
              </li>
            </Fragment>
          )}
          {user && (
            <Fragment>
              <li>
                <Link href="/" onClick={handleClickLogout}>
                  로그아웃
                </Link>
              </li>
              <li>
                <Link href="/my-page">내 정보</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
      {children}
    </Fragment>
  );
}

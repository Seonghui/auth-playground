'use client';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import useUserStore from '@/src/store/userStore';
import { Fragment, useEffect, useState } from 'react';
import { TokenUtil } from '@/src/utils/tokenUtil';
import usersApi from '@/src/api/usersApi';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const accessToken = TokenUtil.getToken();
  const { setUser } = useUserStore();

  const { data } = useQuery({
    queryKey: ['getUser'],
    queryFn: usersApi.getUser,
    enabled: !!accessToken,
  });

  const showLoginNav = !accessToken || !data;
  const { mutate } = useMutation({
    mutationFn: usersApi.postLogout,
    onSuccess: () => {
      TokenUtil.removeToken();
      resetUser();
    },
  });

  const { resetUser, user } = useUserStore();
  const handleClickLogout = () => {
    mutate();
  };

  useEffect(() => {
    if (!data || !accessToken) {
      return;
    }
    setUser(data);
  }, [accessToken, data, setUser]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
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
          {showLoginNav && (
            <Fragment>
              <li>
                <Link href="/login">로그인</Link>
              </li>
              <li>
                <Link href="/register">회원가입</Link>
              </li>
            </Fragment>
          )}
          {!showLoginNav && (
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

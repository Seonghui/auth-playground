'use client';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import useUserStore from '@/src/store/userStore';
import { Fragment, useEffect, useState } from 'react';
import { TokenUtil } from '@/src/utils/tokenUtil';
import usersApi from '@/src/api/usersApi';
import { GlobalStyle } from '@/src/styles/global';
import Header from '@/src/component/common/Header';
import Menu from '@/src/component/common/Menu';
import Logo from '@/src/component/common/Logo';
import { css } from 'styled-components';
import { ModalProvider } from '@/context/ModalContext';

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
      <ModalProvider>
        <Header>
          <Logo />
          <Menu>
            <Menu.Item href="/">홈</Menu.Item>
            <Menu.Item href="/places">장소</Menu.Item>
            <Menu.Item hide={!showLoginNav} href="/login">
              로그인
            </Menu.Item>
            <Menu.Item hide={!showLoginNav} href="/register">
              회원가입
            </Menu.Item>
            <Menu.Item hide={showLoginNav} href="/" onClick={handleClickLogout}>
              로그아웃
            </Menu.Item>
            <Menu.Item hide={showLoginNav} href="/my-page">
              내 정보
            </Menu.Item>
          </Menu>
        </Header>
        {children}
        <GlobalStyle />
      </ModalProvider>
    </Fragment>
  );
}

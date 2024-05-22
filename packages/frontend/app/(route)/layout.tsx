'use client';

import queryClient from '@/lib/reactQuery';
import StyledComponentsRegistry from '@/lib/registry';
import { QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useUserStore from '@/store/userStore';
import { Fragment } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resetUser, user } = useUserStore();
  const handleClickLogout = () => {
    resetUser();
  };
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>
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
            <ReactQueryDevtools initialIsOpen={false} />
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}

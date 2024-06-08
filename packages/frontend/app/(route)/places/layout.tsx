'use client';

import useViewParams from '@/src/hook/useViewParam';
import Link from 'next/link';
import React, { PropsWithChildren, useEffect } from 'react';

const navigation: { [key: string]: { href: string; name: string } } = {
  my: {
    href: '/places',
    name: '장소',
  },
  notFound: {
    href: '/places?view=my',
    name: '내 장소',
  },
};

export default function Layout({ children }: PropsWithChildren) {
  const { viewType } = useViewParams();
  const navigationItem = navigation[viewType];
  return (
    <div>
      <div>
        <Link href="/places/new">추가</Link>
        <Link href={navigationItem.href}>{navigationItem.name}</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}

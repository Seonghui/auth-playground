'use client';

import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <div
        css={`
          background: papayawhip;
        `}
      >
        홈페이지
      </div>
    </main>
  );
}

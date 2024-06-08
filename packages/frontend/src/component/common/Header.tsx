import React, { PropsWithChildren } from 'react';
import { css } from 'styled-components';
import Logo from './Logo';

export default function Header({ children, ...props }: PropsWithChildren) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        padding: 0 16px;
        background-color: #f8fafc;
      `}
    >
      {children}
    </div>
  );
}

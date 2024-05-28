'use client';
import { css } from 'styled-components';

export default function Loading() {
  return (
    <div
      css={css`
        background-color: yellow;
      `}
    >
      로딩...
    </div>
  );
}

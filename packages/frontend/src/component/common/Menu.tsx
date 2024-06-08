import Link from 'next/link';
import React, { Fragment, PropsWithChildren } from 'react';
import { css } from 'styled-components';

interface MenuItemProps {
  href: string;
  hide?: boolean;
  onClick?: () => void;
}

function Item({
  href,
  hide,
  children,
  onClick,
}: PropsWithChildren<MenuItemProps>) {
  if (hide) {
    return <Fragment />;
  }
  return (
    <li
      css={css`
        padding: 0 8px;
      `}
    >
      <Link href={href} onClick={onClick}>
        {children}
      </Link>
    </li>
  );
}

function Menu({ children }: PropsWithChildren) {
  return (
    <ul
      css={css`
        display: flex;
        justify-content: flex-start;
      `}
    >
      {children}
    </ul>
  );
}

Menu.Item = Item;
export default Menu;

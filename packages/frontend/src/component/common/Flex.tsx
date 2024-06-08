import React, { ReactNode } from 'react';
import { PropsWithChildren } from 'react';
import { css } from 'styled-components';

interface FlexProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'auto';
  gap?: number;
  children: React.ReactNode;
}

export default function Flex({
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'auto',
  gap,
}: FlexProps) {
  return (
    <div
      css={css`
        flex-direction: ${direction};
        justify-content: ${justify};
        align-items: ${align};
        gap: ${gap};
      `}
    >
      {React.Children.map(children, child => (
        <React.Fragment>{child}</React.Fragment>
      ))}
    </div>
  );
}

import styled, { css } from "styled-components";

export const BottomNavigationContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  display: flex;
  align-items: center;

  ${({ theme }) => css`
    border-top: 1px solid ${theme.light};
  `};
`;

export const BottomNavigationItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;
  padding: 12px;

  ${({ theme }) => css`
    background: ${theme.primary};
  `};
`;

export const BottomNavigationIcon = styled.div<{ selected: number }>`
  position: relative;
  height: 24px;
  aspect-ratio: 1/1;

  ${({ selected }) =>
    selected
      ? css`
          filter: brightness(0) saturate(100%) invert(32%) sepia(42%)
            saturate(3131%) hue-rotate(177deg) brightness(101%) contrast(101%);
        `
      : css`
          filter: brightness(0) saturate(100%) invert(68%) sepia(40%)
            saturate(0%) hue-rotate(151deg) brightness(111%) contrast(93%);
        `}
`;

export const BottomNavigationItemLabel = styled.p<{ selected: number }>`
  margin: 0;

  ${({ theme, selected }) => css`
    color: ${selected ? theme.secondary : theme.light};
  `};
`;

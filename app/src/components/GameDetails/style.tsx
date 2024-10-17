import { css, styled } from "styled-components";

export const GameDetailsContainer = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 105px;
  left: 0;

  width: 100%;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background: #1d2639;
`;

export const GameDetailsLabel = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const GameDetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GameDetailTimer = styled.div`
  height: 30px;
  aspect-ratio: 1/1;
  background: #12141c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GameDetailBetItem = styled.div<{ selected: number }>`
  ${({ selected }) =>
    selected
      ? css`
          border-radius: 14px;
          border: 3px solid red;
        `
      : css`
          border: 3px solid transparent;
        `}
`;

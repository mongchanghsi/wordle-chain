import styled, { css } from "styled-components";

export const GamePlayContainer = styled.div<{ offset: number }>`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 24px;

  ${({ offset }) => css`
    margin-bottom: ${offset}px;
  `}
`;

export const GamePlayHistorySection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow: scroll;
  gap: 8px;
  white-space: nowrap;
`;

export const GamePlayRaceSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const GamePlayRaceColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const GamePlayRaceIcon = styled.div<{ suited?: boolean }>`
  position: relative;
  height: 32px;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ suited }) =>
    suited
      ? css``
      : css`
          filter: brightness(0) saturate(100%) invert(100%) sepia(91%)
            saturate(1109%) hue-rotate(1deg) brightness(83%) contrast(99%);
        `}
`;

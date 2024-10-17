import styled, { css, keyframes } from "styled-components";

const LoadingRing = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div<{
  color: string;
  size: number;
}>`
  position: relative;
  display: inline-block;

  ${({ size }) =>
    size
      ? css`
          width: ${size}px;
          height: ${size}px;

          & div {
            width: ${size * 0.8}px;
            height: ${size * 0.8}px;
            margin: ${size * 0.1}px;
            border-width: ${size * 0.1}px;
          }
        `
      : css`
          width: 80px;
          height: 80px;

          width: 64px;
          height: 64px;
          margin: 8px;
          border-width: 8px;
        `}

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    border-style: solid;
    border-color: #ffffff;
    
    border-radius: 50%;
    animation: ${LoadingRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ color }) =>
      color ? color : ""} transparent transparent transparent;
    transform: translate(-50%, -50%);

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}
`;

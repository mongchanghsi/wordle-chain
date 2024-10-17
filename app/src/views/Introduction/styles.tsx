import styled from "styled-components";

export const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const IntroductionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const IntroductionTitleIcon = styled.div`
  position: relative;
  height: 32px;
  aspect-ratio: 1/1;
`;

export const IntroductionTitleText = styled.h1`
  font-size: 24px;
`;

export const IntroductionCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

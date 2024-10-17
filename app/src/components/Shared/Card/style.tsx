import styled from "styled-components";

export const CardWrapper = styled.div`
  background-color: transparent;
  width: 66px;
  height: 100px;
  perspective: 1000px;
  flex-shrink: 0;
`;

export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &.flipped {
    transform: rotateY(-180deg);
  }
`;

export const CardContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  &.front {
    transform: rotateY(-180deg);
    backface-visibility: hidden;
  }
`;

export const CardBackInnerBorder = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
`;

export const CardBackIcon = styled.div`
  position: absolute;
  top: 30px;
  left: 13px;
`;

export const CardSuitImage = styled.div`
  position: relative;
  height: 32px;
  aspect-ratio: 1/1;
`;

export const CardValueText = styled.p`
  margin: 0;
  color: black;
  font-size: 32px;
`;

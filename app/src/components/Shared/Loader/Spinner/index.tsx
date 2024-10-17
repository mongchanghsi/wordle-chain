import { FC } from "react";
import { SpinnerContainer } from "./style";

interface IProps {
  color?: string;
  size?: number;
}

const Spinner: FC<IProps> = ({ color = "#FFF", size = 80 }) => {
  return (
    <SpinnerContainer color={color} size={size} data-testid="spinner-loader">
      <div />
      <div />
      <div />
    </SpinnerContainer>
  );
};

export default Spinner;

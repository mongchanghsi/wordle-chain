"use client";

import { FC } from "react";
import { ButtonContainer } from "./style";

interface IProps {
  id?: string;
  label?: string;
  onClick?: () => void;
  size?: "tiny" | "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const DEFAULT_PROPS: IProps = {
  id: "",
  label: "",
  onClick: () => {},
  size: "small",
  variant: "primary",
  disabled: false,
};

const Button: FC<IProps> = (props = DEFAULT_PROPS) => {
  return <ButtonContainer {...props}>{props.label}</ButtonContainer>;
};

export default Button;

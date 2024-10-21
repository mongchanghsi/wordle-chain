"use client";

import { FC } from "react";
import { ButtonContainer, ButtonIcon } from "./style";
import Image from "next/image";

interface IProps {
  id?: string;
  label?: string;
  onClick?: () => void;
  size?: "tiny" | "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  startIcon?: JSX.Element | string;
  endIcon?: JSX.Element | string;
}

const DEFAULT_PROPS: IProps = {
  id: "",
  label: "",
  onClick: () => {},
  size: "small",
  variant: "primary",
  disabled: false,
};

const RenderButtonIcon = (icon: JSX.Element | string, alt: string) => {
  if (typeof icon === "string") {
    return (
      <ButtonIcon>
        <Image src={icon} alt={alt} fill />
      </ButtonIcon>
    );
  }
  return <>{icon}</>;
};

const Button: FC<IProps> = (props = DEFAULT_PROPS) => {
  return (
    <ButtonContainer {...props}>
      {props.startIcon && RenderButtonIcon(props.startIcon, props.label ?? "")}
      {props.label}
      {props.endIcon && RenderButtonIcon(props.endIcon, props.label ?? "")}
    </ButtonContainer>
  );
};

export default Button;

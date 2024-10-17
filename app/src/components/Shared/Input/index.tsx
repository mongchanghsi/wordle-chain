import { ChangeEvent, FC } from "react";
import { InputContainer } from "./style";

interface IProps {
  value: string;
  type: string;
  onChange: (event: ChangeEvent) => void;
  placeholder: string;
}

const Input: FC<IProps> = (props) => {
  return <InputContainer {...props} />;
};

export default Input;

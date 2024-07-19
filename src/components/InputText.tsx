import { HTMLAttributes, ChangeEvent } from "react";
import styled from "styled-components";
import BoxComponent from "./BoxComponent.tsx";

const InputComponent = styled(BoxComponent)`
  padding: 10px 16px;
  width: 100%;
  height: 52px;
  font-size: 1em;
  line-height: 1;
  background: #fff;
  border: 1px solid #333;
  border-radius: 48px;
  box-sizing: border-box;
`;

interface InputTextProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputText = ({ ...props }: InputTextProps) => {
  return <InputComponent as="input" type="text" {...props} />;
};

export default InputText;

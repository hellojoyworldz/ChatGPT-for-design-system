import { HTMLAttributes, ChangeEvent, HTMLInputTypeAttribute } from "react";
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

  &:read-only,
  &:disabled {
    color: #aaa;
    background: #f2f2f2;
  }
`;

interface InputTextProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({ type = "text", ...props }: InputTextProps) => {
  return <InputComponent as="input" type={type} {...props} />;
};

export default InputText;

import styled from "styled-components";
import BoxComponent from "./BoxComponent.tsx";
import { InputTextProps } from "../types/type.ts";

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

const InputText = ({ type = "text", ...props }: InputTextProps) => {
  return <InputComponent as="input" type={type} {...props} />;
};

export default InputText;

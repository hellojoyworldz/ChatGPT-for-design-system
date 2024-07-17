import styled from "styled-components";
import BoxComponent from "../BoxComponent.tsx";
import { HTMLAttributes } from "react";

export const InputTextComponent = styled(BoxComponent)`
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

const InputText = ({ ...props }: HTMLAttributes<HTMLInputElement>) => {
  const sendProps = {
    as: "input",
    type: "text",
    ...props,
  };
  return <InputTextComponent {...sendProps} />;
};

export default InputText;

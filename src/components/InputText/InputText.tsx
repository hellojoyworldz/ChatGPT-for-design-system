import styled from "styled-components";
import BoxComponent from "../BoxComponent.tsx";

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

const InputText = ({
  ...props
}: {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  buttonMessage?: string;
  [key: string]: any;
}) => {
  const sendProps = {
    as: "input",
    type: "text",
    ...props,
  };
  return <InputTextComponent {...sendProps} />;
};

export default InputText;

import styled from "styled-components";
import { ButtonProps } from "../types/type";

const ButtonComponent = styled.button`
  padding: 0 12px;
  height: 40px;
  background: #fffda6;
  border: 1px solid #333;
  border-radius: 52px;
  cursor: pointer;

  &:disabled {
    background: #ddd;
    border: 0;
    cursor: auto;
  }
`;

const Button = ({ type = "button", children, ...props }: ButtonProps) => {
  return (
    <ButtonComponent type={type} {...props}>
      {children}
    </ButtonComponent>
  );
};

export default Button;

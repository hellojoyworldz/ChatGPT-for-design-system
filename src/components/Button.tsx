import styled from "styled-components";
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

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

interface ButtonComponentProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children?: ReactNode;
  onClick?: (() => void) | (() => Promise<void>);
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type = "button",
  children,
  ...props
}: ButtonComponentProps) => {
  return (
    <ButtonComponent type={type} {...props}>
      {children}
    </ButtonComponent>
  );
};

export default Button;

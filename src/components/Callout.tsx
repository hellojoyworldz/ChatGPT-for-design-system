import { HTMLAttributes, ElementType } from "react";
import styled from "styled-components";
import BoxComponent from "./BoxComponent.tsx";

const CalloutComponent = styled(BoxComponent)<{ role?: string }>`
  margin-top: 5px;
  padding: 10px;
  max-width: 70%;
  color: #333;
  line-height: 1.5;
  white-space: pre-wrap;
  border: 1px solid #333;
  border-radius: 18px;
  ${(props) => {
    switch (props.role) {
      case "user":
        return `
          margin-left:auto;
          background: linear-gradient(#fff, #95C8F5);
          border-top-right-radius: 0;
        `;
      case "assistant":
        return `
          margin-right: auto;
          background: linear-gradient(#fff, #A4E156);
          border-top-left-radius: 0;
        `;
      default:
        return "background:#f1f1f1";
    }
  }}
`;

interface CalloutProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  role?: string;
}
const Callout = ({ as = "div", children, ...props }: CalloutProps) => {
  return (
    <CalloutComponent as={as} {...props}>
      {children}
    </CalloutComponent>
  );
};

export default Callout;

import { ElementType, HTMLAttributes } from "react";
import styled from "styled-components";
import BoxComponent from "./BoxComponent.tsx";

const EllipsisLoadingComponent = styled(BoxComponent)<{ $role?: string }>`
  display: inline-block;
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #f8f9fa;
  border-radius: 18px;

  && span {
    display: inline-block;
    margin: 0 3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0;
    animation: loadingDots 1.5s infinite;
    background: ${(props) => {
      switch (props.$role) {
        case "user":
          return "#007bff";
        case "assistant":
          return "#28a745";
        default:
          return "#007bff";
      }
    }};
  }

  && span:nth-child(2) {
    animation-delay: 0.2s;
  }

  && span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loadingDots {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

interface EllipsisLoadingProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  $role?: string;
}

const EllipsisLoading = ({ as = "div", ...props }: EllipsisLoadingProps) => {
  return (
    <EllipsisLoadingComponent as={as} {...props}>
      <span></span>
      <span></span>
      <span></span>
    </EllipsisLoadingComponent>
  );
};

export default EllipsisLoading;

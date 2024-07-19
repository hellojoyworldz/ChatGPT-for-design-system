import { ElementType, HTMLAttributes } from "react";

interface BoxComponentProps extends HTMLAttributes<HTMLHtmlElement> {
  as?: ElementType;
}

const BoxComponent = ({
  as: Component = "div",
  children,
  ...props
}: BoxComponentProps) => {
  return <Component {...props}>{children}</Component>;
};

export default BoxComponent;

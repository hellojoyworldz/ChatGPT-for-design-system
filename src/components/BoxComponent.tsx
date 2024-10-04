import { BoxComponentProps } from "../types/type";

const BoxComponent = ({ as: Component = "div", children, ...props }: BoxComponentProps) => {
  return <Component {...props}>{children}</Component>;
};

export default BoxComponent;

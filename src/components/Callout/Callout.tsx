import { CalloutComponent } from "./Callout.style.ts";

const Callout = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  user?: string;
  [key: string]: any;
}) => {
  return <CalloutComponent {...props}>{children}</CalloutComponent>;
};

export default Callout;

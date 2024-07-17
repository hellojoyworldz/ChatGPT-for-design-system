const BoxComponent = ({ as: Component = "div", children, ...props }) => {
  return <Component {...props}>{children}</Component>;
};
export default BoxComponent;

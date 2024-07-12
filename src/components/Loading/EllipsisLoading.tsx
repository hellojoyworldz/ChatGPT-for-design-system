import styled from "styled-components";

const EllipsisLoadingComponent = styled.div`
  as: ${(props) => props.as};
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
      switch (props.$sender) {
        case "user":
          return "#007bff";
        case "partner":
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
const EllipsisLoading = ({
  as,
  className,
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}) => {
  return (
    <EllipsisLoadingComponent as={as} className={className} {...props}>
      <span></span>
      <span></span>
      <span></span>
    </EllipsisLoadingComponent>
  );
};

export default EllipsisLoading;

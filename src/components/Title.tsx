import styled from "styled-components";
import { ElementType, HTMLAttributes } from "react";

const TitleComponent = styled.header`
  position: sticky;
  top: 0;
  padding: 3em 1em 2em 1em;
  width: 100%;
  background: linear-gradient(0deg, transparent, #fffda6);
  box-sizing: border-box;

  .in {
    max-width: 800px;
    margin: 0 auto;
  }

  && h1 {
    margin: 0;
    font-size: 1.8rem;
    text-align: center;
  }
`;

interface TitleProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  title?: string;
}
const Title = ({ as, children, title }: TitleProps) => {
  return (
    <TitleComponent as={as}>
      <div className="in">
        <h1>{title}</h1>
        {children}
      </div>
    </TitleComponent>
  );
};

export default Title;

import styled from "styled-components";
import { MessageProps } from "../../../../types/type.ts";

export const MessageComponent = styled.div<{ role?: MessageProps["role"] }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  ${(props) =>
    props.role === "user"
      ? `align-items: flex-end;`
      : `align-items: flex-start`}
`;

export const MessageProfileComponent = styled.div<{
  role?: MessageProps["role"];
}>`
  display: flex;
  align-items: center;

  ${(props) => {
    if (props.role === "user") {
      return `flex-direction: row-reverse;`;
    }
  }}

  && .emoji {
    font-size: 20px;
  }

  && .timestamp {
    margin: 0 5px;
    font-size: 0.8em;
    color: #888;
  }
`;

export const MessageImageList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const MessageImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 2px solid #ddd;
  border-radius: 8px;
`;

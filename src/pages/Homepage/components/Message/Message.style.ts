import styled from "styled-components";

export const MessageComponent = styled.div<{ $sender?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  ${(props) => (props.$sender === "user" ? ` align-items: flex-end;` : ``)}
`;

export const MessageProfileComponent = styled.div<{ $sender?: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  ${(props) => {
    if (props.$sender === "user") {
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

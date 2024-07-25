import styled from "styled-components";

export const MessageComponent = styled.div<{ $role?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  ${(props) => (props.$role === "user" ? ` align-items: flex-end;` : ``)}
`;

export const MessageProfileComponent = styled.div<{ $role?: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  ${(props) => {
    if (props.$role === "user") {
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

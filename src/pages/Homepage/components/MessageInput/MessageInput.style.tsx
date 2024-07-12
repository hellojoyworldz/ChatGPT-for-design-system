import styled from "styled-components";

export const MessageInputComponent = styled.div`
  position: relative;
  margin: auto;
  max-width: 800px;

  input {
    display: block;
    max-width: 800px;
    margin: auto;
  }

  && .send {
    position: absolute;
    right: 6px;
    bottom: 6px;
    padding: 0 12px;
    height: 40px;
    background: #fffda6;
    border: 1px solid #333;
    border-radius: 52px;
    cursor: pointer;

    &:disabled {
      background: #ddd;
      border: 0;
      cursor: auto;
    }
  }
`;

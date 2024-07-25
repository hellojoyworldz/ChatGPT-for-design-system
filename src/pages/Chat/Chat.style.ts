import styled from "styled-components";

export const ChatComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const ChatHeader = styled.header`
  position: sticky;
  top: 0;
  margin: 0 auto;
  padding: 3em 1em 2em 1em;
  width: 100%;
  max-width: 800px;
  background: linear-gradient(0deg, transparent, #fffda6);
  box-sizing: border-box;

  && h1 {
    margin: 0;
    font-size: 1.8rem;
    text-align: center;
  }

  && .reset {
    display: block;
    margin: 0 0 0 auto;
    padding: 0.5em 1em;
    border: 0;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;

export const ChatMessage = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 0 1em;
`;

export const ChatInput = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  padding: 1em;
  width: 100%;
  background: linear-gradient(0deg, #fff 55%, transparent);
  box-sizing: border-box;
`;

export const MessageInput = styled.div`
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

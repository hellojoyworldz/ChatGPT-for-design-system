import styled from "styled-components";

export const HomepageComponent = styled.div`
  padding-bottom: calc(6em + 52px);
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const HomepageHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  padding: 2em;
  background: linear-gradient(0deg, transparent, #fffda6);
  && h1 {
    margin: 0;
    font-size: 2em;
    text-align: center;
  }
`;

export const HomepageMessage = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 0 1em;
`;

export const HomepageInput = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 6em 2em 2em 2em;
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

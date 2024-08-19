import styled from "styled-components";

export const ChatComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const ChatHeader = styled.header`
  position: sticky;
  top: 0;
  padding: 3em 1em 2em 1em;
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  .in {
    max-width: 800px;
    margin: 0 auto;
  }

  && h1 {
    margin: 0;
    font-size: 1.8rem;
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

export const ChatBody = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  height: 100%;
`;

export const ChatMessage = styled.div`
  padding: 0 1em;
`;

export const ChatInputField = styled.div`
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
`;

export const MessageInputButton = styled.div`
  position: absolute;
  right: 6px;
  bottom: 6px;
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  padding: 24px;
  height: 122px;
  background: rgb(255 253 172 / 50%);
  border: 1px solid #333;
  border-radius: 24px;
  box-sizing: border-box;
  overflow-x: auto;
`;

export const ImageDragZone = styled.div`
  width: 100%;
  text-align: center;

  .title {
    font-size: 24px;
  }

  .text {
    margin: 1em 0 0 0;
    font-size: 12px;
  }
`;

export const ImageList = styled.div`
  display: flex;
  gap: 16px;
`;

export const ImageListItem = styled.span`
  position: relative;
  display: block;
  width: 100px;
  height: 72px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid #ddd;
    border-radius: 8px;
    object-fit: cover;
    box-sizing: border-box;
  }

  .close {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 24px;
    height: 24px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }
`;

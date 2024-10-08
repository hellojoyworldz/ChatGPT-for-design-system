import styled from "styled-components";
import chat from "../../assets/images/chat.svg";

export const ChatPluginComponent = styled.aside`
  position: relative;
  z-index: 9999;
`;

export const ChatPluginOpenButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 0;
  width: 72px;
  height: 72px;
  background-image: url(${chat});
  background-repeat: no-repeat;
  background-size: 120%;
  background-position: 20% 10%;
  border: 0;
  border-radius: 72px;
  box-shadow: -5px 5px 10px 0 #ddd;
  cursor: pointer;

  @media (max-width: 860px) {
    right: 1em;
    bottom: 84px;
  }
`;

export const ChatPluginBox = styled.article`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 380px;
  height: calc(100% - 110px);
  max-height: 680px;
  background: #fff;
  border: 1px solid #222;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 480px) {
    top: 8px;
    bottom: 8px;
    left: 8px;
    right: 8px;
    width: auto;
    height: auto;
    max-height: 100%;
  }
`;

export const ChatPluginBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const ChatPluginBoxNav = styled.nav`
  display: flex;
  background: linear-gradient(180deg, transparent, #fffda6);

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 100%;
    height: 72px;
    text-decoration: none;
    color: #333;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .icon {
    font-size: 1.5rem;
  }

  .text {
    font-size: 0.8rem;
  }
`;

export const ChatPluginCloseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 32px;
  height: 32px;
  background: #fff;
  border: 1px solid #333;
  border-radius: 50%;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 25%;
    margin-top: 1px;
    margin-left: -1px;
    width: 2px;
    height: 50%;
    background: #555;
  }

  &::before {
    transform: rotate(-45deg);
  }

  &::after {
    transform: rotate(45deg);
  }
`;

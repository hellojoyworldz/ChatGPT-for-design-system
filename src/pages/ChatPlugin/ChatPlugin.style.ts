import styled from "styled-components";
import chat from "../../assets/images/chat.svg";

export const ChatPluginComponent = styled.aside`
  position: relative;
  z-index: 9999;
`;

export const ChatPluginOpenButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 0;
  padding: 0;
  width: 64px;
  height: 48px;
  background-image: url(${chat});
  background-repeat: no-repeat;
  background-size: 120%;
  background-position: 20% 10%;
  border: 0;
  border-radius: 28px 0 0 28px;
  box-shadow: -5px 5px 10px 0 #ddd;
  cursor: pointer;
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
`;

export const ChatPluginBoxNav = styled.nav`
  display: flex;
  height: 72px;
  background: linear-gradient(180deg, transparent, #fffda6);

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-decoration: none;
    color: #333;
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

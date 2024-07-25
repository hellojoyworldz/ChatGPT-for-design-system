import Chat from "../Chat/Chat.tsx";
import { Link } from "react-router-dom";
import {
  ChatPluginComponent,
  ChatPluginOpenButton,
  ChatPluginBox,
  ChatPluginBoxNav,
  ChatPluginCloseButton,
} from "./ChatPlugin.style.ts";
import { LangType } from "../../types/type.ts";

const navText = {
  en: {
    notice: "notice",
    chat: "Chat",
    settings: "Settings",
  },
  ko: {
    notice: "공지",
    chat: "채팅",
    settings: "세팅",
  },
};

const ChatPlugin = ({ lang = "en" }: LangType) => {
  return (
    <ChatPluginComponent>
      <ChatPluginOpenButton />
      <ChatPluginBox>
        <Chat />
        <ChatPluginBoxNav>
          <Link className="item" to="/">
            <span className="icon">🐹</span>
            <span className="text">{navText[lang]?.notice}</span>
          </Link>
          <Link className="item" to="/caht">
            <span className="icon">💬</span>
            <span className="text">{navText[lang]?.chat}</span>
          </Link>
          <Link className="item" to="/settings">
            <span className="icon">⚙️</span>
            <span className="text">{navText[lang]?.settings}</span>
          </Link>
        </ChatPluginBoxNav>
        <ChatPluginCloseButton />
      </ChatPluginBox>
    </ChatPluginComponent>
  );
};

export default ChatPlugin;

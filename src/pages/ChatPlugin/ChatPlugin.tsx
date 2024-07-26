import { useState } from "react";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat.tsx";

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
  const [isOpen, setOpen] = useState(false);

  const toggleChatPlugin = () => setOpen(!isOpen);

  return (
    <ChatPluginComponent>
      {!isOpen && <ChatPluginOpenButton onClick={toggleChatPlugin} />}
      {isOpen && (
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
          <ChatPluginCloseButton onClick={() => setOpen(false)} />
        </ChatPluginBox>
      )}
    </ChatPluginComponent>
  );
};

export default ChatPlugin;

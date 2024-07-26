import { useState } from "react";
import { LangType } from "../../types/type.ts";
import {
  ChatPluginComponent,
  ChatPluginOpenButton,
  ChatPluginBox,
  ChatPluginBoxNav,
  ChatPluginCloseButton,
} from "./ChatPlugin.style.ts";
import Chat from "../Chat/Chat.tsx";
import Notice from "../Notice/Notice.tsx";
import Settings from "../Settings/Settings.tsx";

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
  const [content, setContent] = useState("notice");

  const toggleChatPlugin = () => setOpen(!isOpen);

  return (
    <ChatPluginComponent>
      {!isOpen && <ChatPluginOpenButton onClick={toggleChatPlugin} />}
      {isOpen && (
        <ChatPluginBox>
          {content === "notice" ? (
            <Notice />
          ) : content === "chat" ? (
            <Chat />
          ) : content === "settings" ? (
            <Settings />
          ) : null}
          <ChatPluginBoxNav>
            <button className="item" onClick={() => setContent("notice")}>
              <span className="icon">🐹</span>
              <span className="text">{navText[lang]?.notice}</span>
            </button>
            <button className="item" onClick={() => setContent("chat")}>
              <span className="icon">💬</span>
              <span className="text">{navText[lang]?.chat}</span>
            </button>
            <button className="item" onClick={() => setContent("settings")}>
              <span className="icon">⚙️</span>
              <span className="text">{navText[lang]?.settings}</span>
            </button>
          </ChatPluginBoxNav>
          <ChatPluginCloseButton onClick={() => setOpen(false)} />
        </ChatPluginBox>
      )}
    </ChatPluginComponent>
  );
};

export default ChatPlugin;

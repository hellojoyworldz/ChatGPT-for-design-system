import { useState } from "react";
import { LangType } from "../../types/type.ts";
import {
  ChatPluginComponent,
  ChatPluginOpenButton,
  ChatPluginBox,
  ChatPluginBoxContent,
  ChatPluginBoxNav,
  ChatPluginCloseButton,
} from "./ChatPlugin.style.ts";
import Chat from "../Chat/Chat.tsx";
import Notice from "./components/Notice/Notice.tsx";
import Settings from "./components/Settings/Settings.tsx";
import { modelOptions, navText } from "../../utils/data.ts";
import { useModel } from "../../hook/useModel.tsx";
import { useApiKey } from "../../hook/useApiKey.tsx";

const ChatPlugin = ({ lang = "ko" }: LangType) => {
  const { inputKey, setInputKey, isApiKey, setApiKey } = useApiKey();
  const { model, setModel } = useModel();
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState("notice");

  const toggleChatPlugin = () => setOpen(!isOpen);

  return (
    <ChatPluginComponent>
      {!isOpen && <ChatPluginOpenButton onClick={toggleChatPlugin} />}
      {isOpen && (
        <ChatPluginBox>
          <ChatPluginBoxContent>
            {content === "notice" ? (
              <Notice />
            ) : content === "chat" ? (
              <Chat />
            ) : content === "settings" ? (
              <Settings
                modelOptions={modelOptions}
                inputKey={inputKey}
                setInputKey={setInputKey}
                isApiKey={isApiKey}
                setApiKey={setApiKey}
                model={model}
                setModel={setModel}
              />
            ) : null}
          </ChatPluginBoxContent>
          <ChatPluginBoxNav>
            <button className="item" onClick={() => setContent("notice")}>
              <span className="icon">🐹</span>
              <span className="text">{navText[lang]?.notice}</span>
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

import { useEffect, useState } from "react";
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
import { settingModel } from "../../utils/api.ts";
import { modelOptions, navText } from "../../utils/data.ts";

const ChatPlugin = ({ lang = "ko" }: LangType) => {
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState("notice");
  const [isApiKey, setApiKey] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState<string>("");
  const [model, setModel] = useState<string>(modelOptions[0].value);

  const toggleChatPlugin = () => setOpen(!isOpen);

  useEffect(() => {
    settingModel(model);
  }, [model]);

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
            {/*<button className="item" onClick={() => setContent("chat")}>*/}
            {/*  <span className="icon">💬</span>*/}
            {/*  <span className="text">{navText[lang]?.chat}</span>*/}
            {/*</button>*/}
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

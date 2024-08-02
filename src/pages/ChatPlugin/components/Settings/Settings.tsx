import { useState } from "react";
import {
  SettingsComponent,
  SettingsInput,
  SettingButtons,
} from "./Settings.style.ts";
import Title from "../../../../components/Title.tsx";
import InputText from "../../../../components/InputText.tsx";
import { refreshOpenAI } from "../../../../utils/api.ts";

const Settings = ({ inputKey, setInputKey, isApiKey, setApiKey }) => {
  const [inputType, setInputType] = useState<string>("password");

  // 입력한 api key 저장
  const handelApiKey = () => {
    const filterApiKey = inputKey.trim();
    if (!filterApiKey) {
      alert("key 값을 입력해주세요");
      setInputKey("");
      return;
    }
    setInputKey("*".repeat(inputKey.length));
    setApiKey(true);
    setInputType("password");
    refreshOpenAI(filterApiKey);
  };

  // api key 초기화
  const handleResetApiKey = () => {
    setApiKey(false);
    setInputKey("");
    refreshOpenAI("");
  };

  // input type 변경
  const changeInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <section>
      <Title title="세팅" />
      <SettingsComponent>
        <strong className="tit">OpenAI Key</strong>
        <SettingsInput>
          <InputText
            type={inputType}
            value={inputKey}
            readOnly={isApiKey}
            onChange={(e) => setInputKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                if (e.keyCode === 229) return;
                e.preventDefault();
                handelApiKey();
              }
            }}
          />
          {!isApiKey && (
            <button className="send" onClick={changeInputType}>
              👀
            </button>
          )}
        </SettingsInput>
        <SettingButtons>
          {!isApiKey && (
            <button className="item" onClick={handelApiKey}>
              저장
            </button>
          )}
          {isApiKey && (
            <button className="item" onClick={handleResetApiKey}>
              초기화
            </button>
          )}
        </SettingButtons>
      </SettingsComponent>
    </section>
  );
};

export default Settings;

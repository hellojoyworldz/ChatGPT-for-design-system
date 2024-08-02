import { Dispatch, SetStateAction, useState } from "react";
import {
  SettingsComponent,
  SettingsInput,
  SettingButtons,
  SettingsTitle,
} from "./Settings.style.ts";
import { settingApiKey } from "../../../../utils/api.ts";
import { encryptKey } from "../../../../utils/keyManage.ts";
import Title from "../../../../components/Title.tsx";
import InputText from "../../../../components/InputText.tsx";

const Settings = ({
  inputKey,
  setInputKey,
  isApiKey,
  setApiKey,
}: {
  inputKey: string;
  setInputKey: Dispatch<SetStateAction<string>>;
  isApiKey: boolean;
  setApiKey: Dispatch<SetStateAction<boolean>>;
}) => {
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
    settingApiKey(encryptKey(filterApiKey));
  };

  // api key 초기화
  const handleResetApiKey = () => {
    setApiKey(false);
    setInputKey("");
    settingApiKey("");
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
        <SettingsTitle>OpenAI Key</SettingsTitle>
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

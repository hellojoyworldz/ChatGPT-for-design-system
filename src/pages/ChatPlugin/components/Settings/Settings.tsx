import { useState } from "react";
import {
  SettingsComponent,
  SettingsInput,
  SettingButtons,
  SettingsTitle,
} from "./Settings.style.ts";
import { apiKeyStoreManager } from "../../../../utils/keyManage.ts";
import Title from "../../../../components/Title.tsx";
import InputText from "../../../../components/InputText.tsx";
import SelectBox from "../../../../components/SelectBox.tsx";
import { SettingProps } from "../../../../types/type.ts";
import { useApiKey } from "../../../../hook/useApiKey.tsx";

const Settings = ({ modelOptions, model, setModel }: SettingProps) => {
  const {
    isApiKey,
    inputKey,
    setInputKey,
    handleSettingApiKey,
    handleResetApiKey,
  } = useApiKey();
  const [inputType, setInputType] = useState<string>("password");

  // 임시키 사용
  const handelTemporaryApiKey = () => {
    const temporaryApiKey = apiKeyStoreManager.getTemporaryAPIKey();
    handleSettingApiKey(temporaryApiKey);
  };

  // 입력한 api key 저장
  const handelApiKey = () => {
    const filterApiKey = inputKey.trim();
    if (!filterApiKey) {
      alert("key 값을 입력해주세요");
      setInputKey("");
      return;
    }
    handleSettingApiKey(filterApiKey);
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
        <SettingsTitle>OpenAI API Key</SettingsTitle>
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
            <>
              <button className="item" onClick={handelTemporaryApiKey}>
                임시키사용
              </button>
              <button className="item" onClick={handelApiKey}>
                저장
              </button>
            </>
          )}
          {isApiKey && (
            <button className="item" onClick={handleResetApiKey}>
              초기화
            </button>
          )}
        </SettingButtons>
        <SettingsTitle>Model</SettingsTitle>
        <SelectBox options={modelOptions} model={model} setModel={setModel} />
      </SettingsComponent>
    </section>
  );
};

export default Settings;

import { useEffect, useState } from "react";
import { SettingsComponent, SettingsInput, SettingButtons, SettingsTitle } from "./Settings.style.ts";
import { settingModel } from "../../../../utils/api.ts";
import { apiKeyStoreManager, encryptKey } from "../../../../utils/keyManage.ts";
import Title from "../../../../components/Title.tsx";
import InputText from "../../../../components/InputText.tsx";
import SelectBox from "../../../../components/SelectBox.tsx";
import { SettingProps } from "../../../../types/type.ts";

const Settings = ({ modelOptions, inputKey, setInputKey, isApiKey, setApiKey, model, setModel }: SettingProps) => {
  const [inputType, setInputType] = useState<string>("password");

  // 임시키 사용
  const handelTemporaryApiKey = () => {
    setInputKey("*".repeat(apiKeyStoreManager.getTemporaryAPIKey().length));
    setApiKey(true);
    apiKeyStoreManager.setKey(encryptKey(apiKeyStoreManager.getTemporaryAPIKey()));
  };

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
    apiKeyStoreManager.setKey(encryptKey(filterApiKey));
  };

  // api key 초기화
  const handleResetApiKey = () => {
    setApiKey(false);
    setInputKey("");
    apiKeyStoreManager.setKey("");
  };

  // input type 변경
  const changeInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  // model 변경
  useEffect(() => {
    settingModel(model);
  }, [model]);

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

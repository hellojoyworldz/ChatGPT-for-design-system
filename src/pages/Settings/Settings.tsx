import { useEffect, useState } from "react";
import {
  SettingsComponent,
  SettingsInput,
  SettingButtons,
} from "./Settings.style.ts";
import CryptoJS from "crypto-js";
import Title from "../../components/Title.tsx";
import InputText from "../../components/InputText.tsx";

const STORAGE_KEY = "encryptedApiKey";
const SECRET_KEY = "your-secret-key-here";
const Settings = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [inputType, setInputType] = useState<string>("password");

  // 암호화 후 localStorage에 저장
  const encrypteKey = () => {
    const encryptedKey = CryptoJS.AES.encrypt(apiKey, SECRET_KEY).toString();
    localStorage.setItem(STORAGE_KEY, encryptedKey);
    setApiKey(encryptedKey);
    setHasStoredKey(true);
  };

  // 입력한 api key 저장
  const handelApiKey = () => {
    const filterApiKey = apiKey.trim();
    if (!filterApiKey) {
      alert("key 값을 입력해주세요");
      setApiKey("");
      return;
    }
    encrypteKey();
    setInputType("password");
    alert("key 값이 저장되었습니다");
  };

  // api key 초기화
  const resetApiKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey("");
    setHasStoredKey(false);
  };

  // input type 변경
  const changeInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  useEffect(() => {
    const key = localStorage.getItem(STORAGE_KEY);
    if (key) {
      setApiKey(key);
      setHasStoredKey(true);
    }
  }, []);

  return (
    <section>
      <Title title="세팅" />
      <SettingsComponent>
        <strong className="tit">OpenAI Key</strong>
        <SettingsInput>
          <InputText
            type={inputType}
            value={apiKey}
            readOnly={hasStoredKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => {
              if (
                !hasStoredKey &&
                e.key === "Enter" &&
                !e.ctrlKey &&
                !e.shiftKey &&
                !e.altKey
              ) {
                if (e.keyCode === 229) return;
                e.preventDefault();
                handelApiKey();
              }
            }}
          />
          {!hasStoredKey && (
            <button className="send" onClick={changeInputType}>
              👀
            </button>
          )}
        </SettingsInput>
        <SettingButtons>
          {!hasStoredKey && (
            <button className="item" onClick={handelApiKey}>
              저장
            </button>
          )}
          {hasStoredKey && (
            <button className="item" onClick={resetApiKey}>
              초기화
            </button>
          )}
        </SettingButtons>
      </SettingsComponent>
    </section>
  );
};

export default Settings;

import { useEffect, useState } from "react";
import { apiKeyStoreManager, encryptKey, decryptKey } from "../utils/keyManage";

export const useApiKey = () => {
  const [isApiKey, setApiKey] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState<string>("");

  useEffect(() => {
    const storedKey = decryptKey(apiKeyStoreManager.getKey());
    if (storedKey) {
      setInputKey("*".repeat(storedKey.length));
      setApiKey(true);
    }
  }, []);

  // 입력한 api key 저장
  const handleSettingApiKey = (key: string) => {
    const encryptedKey = encryptKey(key);
    apiKeyStoreManager.setKey(encryptedKey);
    setInputKey("*".repeat(key.length));
    setApiKey(true);
  };

  // api key 초기화
  const handleResetApiKey = () => {
    apiKeyStoreManager.setKey("");
    setInputKey("");
    setApiKey(false);
  };

  return {
    isApiKey,
    setApiKey,
    inputKey,
    setInputKey,
    handleSettingApiKey,
    handleResetApiKey,
  };
};

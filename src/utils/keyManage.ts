import CryptoJS from "crypto-js";

const TEMPORARY_API_KEY = import.meta.env.VITE_OPEN_AI_KEY;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// 암호화
export const encryptKey = (key: string) => {
  return CryptoJS.AES.encrypt(key, SECRET_KEY).toString();
};

// 복호화
export const decryptKey = (key: string) => {
  return CryptoJS.AES.decrypt(key, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

// api key 저장소
class APIKeyStore {
  private static apiKey = "";

  static getAPIKey(): string {
    return this.apiKey;
  }

  static setAPIKey(key: string) {
    this.apiKey = key;
  }

  static getTemporaryAPIKey(): string {
    return TEMPORARY_API_KEY;
  }
}

export const apiKeyStoreManager = {
  getKey: () => APIKeyStore.getAPIKey(),
  setKey: (key: string) => APIKeyStore.setAPIKey(key),
  getTemporaryAPIKey: () => APIKeyStore.getTemporaryAPIKey(),
};

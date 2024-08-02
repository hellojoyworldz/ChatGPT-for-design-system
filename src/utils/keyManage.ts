import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// 암호화
export const encryptKey = (key: string) => {
  return CryptoJS.AES.encrypt(key, SECRET_KEY).toString();
};

// 복호화
export const decryptKey = (key: string) => {
  return CryptoJS.AES.decrypt(key, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

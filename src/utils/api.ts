import OpenAI from "openai";
import { Dispatch, SetStateAction } from "react";
import { promptDesignSystem } from "./prompt";
import { MessageProps } from "../types/type.ts";
import CryptoJS from "crypto-js";

const STORAGE_KEY = import.meta.env["VITE_OPEN_STORAGE_KEY"];
const SECRET_KEY = import.meta.env["VITE_OPEN_SECRET_KEY"];
const DEFAULT_API_KEY = import.meta.env["VITE_OPEN_AI_KEY"];

// 사용자가 입력한 OpenAI Key 복호화
const decryptKey = () => {
  const encryptedKey = localStorage.getItem(STORAGE_KEY);
  if (!encryptedKey) return null;
  try {
    const decryptedKey = CryptoJS.AES.decrypt(
      encryptedKey,
      SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
    return decryptedKey || null;
  } catch (error) {
    console.error("키 복호화 중 오류 발생:", error);
    return null;
  }
};

// 사용자가 입력한 키가 있으면 사용, 없으면 세팅된 키 사용
const getApiKey = () => {
  const userKey = decryptKey();
  return userKey || DEFAULT_API_KEY;
};

let openai = new OpenAI({
  apiKey: getApiKey(),
  dangerouslyAllowBrowser: true,
});

// OpenAI key가 변경되었을 때
export const refreshOpenAI = () => {
  openai = new OpenAI({
    apiKey: getApiKey(),
    dangerouslyAllowBrowser: true,
  });
};

export const chatResponse = async (
  messages: MessageProps[],
  setStreamingMessage: Dispatch<SetStateAction<string>>,
  setStreaming: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<string> => {
  const promptMessage: MessageProps = {
    role: "system",
    content: promptDesignSystem,
  };

  const chattingMessages =
    messages[0].role === "system" ? messages : [promptMessage, ...messages];

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chattingMessages,
      top_p: 1,
      temperature: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      n: 1,
      stream: true,
    });

    let chunkContent = "";
    setStreaming(true);

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      chunkContent += content;
      setStreamingMessage(chunkContent);
      setLoading(false);
    }

    setStreaming(false);
    return (
      chunkContent || "죄송합니다. 응답을 받아오는 데 문제가 발생했습니다."
    );
  } catch (error) {
    console.log("response error", error);
    throw new Error("AI 응답을 생성하는 데 문제가 발생했습니다.");
  }
};

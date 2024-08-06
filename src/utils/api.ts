import { Dispatch, SetStateAction } from "react";
import { promptDesignSystem } from "./prompt";
import { MessageProps } from "../types/type.ts";
import { modelOptions } from "./data.ts";

const API_URL = import.meta.env.VITE_OPEN_AI_URL;
const PORT = import.meta.env.VITE_OPEN_AI_PORT;
let apiKey: string = "";
let model: string = "" || modelOptions[0].value;

// 세팅에서 저장한 api key
export const settingApiKey = (key: string) => {
  apiKey = key;
};

// 세팅에서 선택한 model
export const settingModel = (value: string) => {
  model = value;
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
    const response = await fetch(`${API_URL}:${PORT}/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-model": model,
        "X-API-key": apiKey,
      },
      body: JSON.stringify({
        messages: chattingMessages,
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    setStreaming(true);
    let chunkContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setLoading(false);

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);

          if (data === "[DONE]") break;

          try {
            const parsedData = JSON.parse(data);
            if (parsedData.content) {
              chunkContent += parsedData.content;
              setStreamingMessage(chunkContent);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      }
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

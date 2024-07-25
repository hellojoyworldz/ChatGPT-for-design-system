import OpenAI from "openai";
import { promptDesignSystem } from "./prompt";
import { MessageProps } from "../types/type.ts";
import { Dispatch, SetStateAction } from "react";

const openai = new OpenAI({
  apiKey: import.meta.env["VITE_OPEN_AI_KEY"],
  dangerouslyAllowBrowser: true,
});

export const chatResponse = async (
  messages: MessageProps[],
  setStreamingMessage: Dispatch<SetStateAction<string>>,
  setStreaming: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  isLoading: boolean,
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
      if (isLoading) setLoading(false);
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

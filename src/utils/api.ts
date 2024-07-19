import OpenAI from "openai";
import { promptDesignSystem } from "./prompt";
import { MessageProps } from "../types/type.ts";

const openai = new OpenAI({
  apiKey: import.meta.env["VITE_OPEN_AI_KEY"],
  dangerouslyAllowBrowser: true,
});

export const chatResponse = async (
  messages: MessageProps[],
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
    });

    return (
      chatCompletion.choices[0].message?.content ||
      "죄송합니다. 응답을 받아오는 데 문제가 발생했습니다."
    );
  } catch (error) {
    console.log("response error", error);
    throw new Error("AI 응답을 생성하는 데 문제가 발생했습니다.");
  }
};

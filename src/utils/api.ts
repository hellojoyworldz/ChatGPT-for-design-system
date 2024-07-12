import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env["VITE_OPEN_AI_KEY"],
  dangerouslyAllowBrowser: true,
});

export const chatResponse = async (message: string): Promise<string> => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "너는 디자인 시스템에 특화되어 있어. " +
            "디자인 토큰, 구성 요소 라이브러리, 스타일 가이드, 웹/앱 전반에 걸쳐 " +
            "일관성을 유지하기 위한 모범 사례와 같은 주제에 대한 지침을 제공해줘.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return (
      chatCompletion.choices[0].message?.content ||
      "죄송합니다. 응답을 생성하는 데 문제가 발생했습니다."
    );
  } catch (error) {
    console.log("response error", error);
    throw new Error("AI 응답을 생성하는 데 문제가 발생했습니다.");
  }
};

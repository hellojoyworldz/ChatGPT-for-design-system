import OpenAI from "openai";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config();

const SECRET_KEY = process.env.VITE_SECRET_KEY;

const decryptKey = (key) => {
  return CryptoJS.AES.decrypt(key, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

export const handler = async (event, context) => {
  try {
    const { apiKey: key, model, messages } = event;

    if (!key) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "API 키가 없습니다." }),
      };
    }

    if (!model) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "모델이 지정되지 않았습니다." }),
      };
    }

    let apiKey = "";
    try {
      apiKey = decryptKey(key);
    } catch (decryptError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "잘못된 API 키 형식입니다." }),
      };
    }

    const chat = new OpenAI({
      apiKey: apiKey,
    });

    const chatCompletion = await chat.chat.completions.create({
      model,
      messages,
      top_p: 1,
      temperature: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      n: 1,
      stream: true,
    });

    const responseHeaders = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    };

    const chunks = [];

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      chunks.push(`data: ${JSON.stringify({ content })}\n\n`);
    }

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: chunks.join("") + "data: [DONE]\n\n",
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "요청 처리 중 오류가 발생했습니다." + error,
      }),
    };
  }
};

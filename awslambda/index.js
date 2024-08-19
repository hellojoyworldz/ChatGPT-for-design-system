import OpenAI from "openai";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config();

const SECRET_KEY = process.env.VITE_SECRET_KEY;

const decryptKey = (key) => {
  return CryptoJS.AES.decrypt(key, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

export const handler = awslambda.streamifyResponse(
  async (event, responseStream) => {
    try {
      const { apiKey: key, model, messages } = JSON.parse(event.body);

      if (!key) {
        responseStream.write(JSON.stringify({ error: "API 키가 없습니다." }));
        return responseStream.end();
      }

      if (!model) {
        responseStream.write(
          JSON.stringify({ error: "모델이 지정되지 않았습니다." }),
        );
        return responseStream.end();
      }

      let apiKey = "";
      try {
        apiKey = decryptKey(key);
      } catch (decryptError) {
        responseStream.write(
          JSON.stringify({ error: "잘못된 API 키 형식입니다." }),
        );
        return responseStream.end();
      }

      // responseStream.setContentType("text/event-stream");
      const httpResponseMetadata = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      };

      responseStream = awslambda.HttpResponseStream.from(
        responseStream,
        httpResponseMetadata,
      );

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

      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || "";
        responseStream.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
      responseStream.write("data: [DONE]\n\n");
    } catch (error) {
      console.log("error", error);
      responseStream.write(
        JSON.stringify({
          error: "요청 처리 중 오류가 발생했습니다." + error,
        }),
      );
    } finally {
      responseStream.end();
    }
  },
);
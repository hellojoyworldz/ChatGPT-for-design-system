import OpenAI from "openai";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config();

const SECRET_KEY = process.env.VITE_SECRET_KEY;

const decryptKey = (key) => {
  return CryptoJS.AES.decrypt(key, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

const errorResponseStream = (responseStream, statusCode, message) => {
  responseStream = awslambda.HttpResponseStream.from(responseStream, {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
  responseStream.write(JSON.stringify({ error: message }));
  return responseStream.end();
};

export const handler = awslambda.streamifyResponse(
  async (event, responseStream) => {
    try {
      const { apiKey: key, model, messages } = JSON.parse(event.body);

      if (!key) {
        return errorResponseStream(responseStream, 401, "API 키가 없습니다.");
      }

      if (!model) {
        return errorResponseStream(
          responseStream,
          400,
          "모델이 지정되지 않았습니다.",
        );
      }

      let apiKey = "";
      try {
        apiKey = decryptKey(key);
      } catch (decryptError) {
        return errorResponseStream(
          responseStream,
          401,
          "잘못된 API 키 형식입니다.",
        );
      }

      responseStream = awslambda.HttpResponseStream.from(responseStream, {
        statusCode: 200,
        headers: {
          "Content-Type": "text/event-stream",
        },
      });

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
      console.log("DONE!!!");
    } catch (error) {
      errorResponseStream(responseStream, error.status, error);
      console.log("error", error);
    } finally {
      responseStream.end();
    }
  },
);

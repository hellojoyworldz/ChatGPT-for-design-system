import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import CryptoJS from "crypto-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.VITE_SECRET_KEY;
const decryptKey = (key) => {
  return CryptoJS.AES.decrypt(key, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

let apiKey = "";
let openai = new OpenAI({
  apiKey,
});
app.post("/api/openai", async (req, res) => {
  try {
    const key = req.header("X-API-key");
    const model = req.header("X-Model") || "gpt-4o-mini";
    const { messages } = req.body;

    if (!key) {
      return res.status(401).json({ error: "API 키가 없습니다." });
    }

    apiKey = decryptKey(key);
    openai = new OpenAI({
      apiKey: apiKey,
    });

    const chatCompletion = await openai.chat.completions.create({
      model,
      messages,
      top_p: 1,
      temperature: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      n: 1,
      stream: true,
    });

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }

    res.end("data: [DONE]\n\n");
  } catch (error) {
    console.error("OpenAI API error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
    throw error;
  }
});

app.listen(port, () => {
  console.log(`server port: ${port}`);
});

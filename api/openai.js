import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/openai", async (req, res) => {
  try {
    const { apiKey, model, messages } = req.body;
    const openai = new OpenAI({
      apiKey,
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
  }
});

app.listen(port, () => {
  console.log(`server port: ${port}`);
});

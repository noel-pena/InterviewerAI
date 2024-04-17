import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// eslint-disable-next-line no-undef
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const runPrompt = async () => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Tell me a joke" }],
    model: "gpt-3.5-turbo",
    max_tokens: 2040,
    temperature: 1,
  });

  console.log(completion.choices[0]);
};

runPrompt();

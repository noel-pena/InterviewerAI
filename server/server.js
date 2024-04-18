/* eslint-disable no-undef */
import dotenv from "dotenv";
import OpenAI from "openai";
import readline from "readline";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: input }],
    model: "gpt-3.5-turbo",
    max_tokens: 2040,
  });
  console.log(completion.choices[0].message.content);
  userInterface.prompt();
});

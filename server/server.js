/* eslint-disable no-undef */
import dotenv from "dotenv";
import OpenAI from "openai";
// import readline from "readline";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const userInterface = async (userInput) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userInput }],
      mdoel: "gpt-3.5-turbo",
      max_tokens: 2040,
      temperature: 0,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "Error generating response";
  }
};

// Node usage
// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// userInterface.prompt();
// userInterface.on("line", async (input) => {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: input }],
//     model: "gpt-3.5-turbo",
//     max_tokens: 2040,
//   });
//   console.log(completion.choices[0].message.content);
//   userInterface.prompt();
// });

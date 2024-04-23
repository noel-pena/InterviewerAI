/* eslint-disable no-undef */
import dotenv from "dotenv";
import OpenAI from "openai";

import readline from "readline";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const interviewQuestions = [
  "Tell me about yourself.",
  "Walk me through your resume.",
  "How did you hear about this position?",
  "Why do you want to work at this company?",
  "Why do you want this job?",
  "Why should we hire you?",
  "What can you bring to the company?",
  "What are your greatest strengths?",
  "What do you consider to be your weaknesses?",
  "What is your greatest professional achievement?",
  "Tell me about a challenge or conflict you’ve faced at work, and how you dealt with it.",
  "Tell me about a time you demonstrated leadership skills.",
  "What’s a time you disagreed with a decision that was made at work?",
  "Tell me about a time you made a mistake.",
  "Tell me about a time you failed.",
  "Why are you leaving your current job?",
  "Why were you fired?",
  "Why was there a gap in your employment?",
  "Can you explain why you changed career paths?",
  "What’s your current salary?",
  "What do you like least about your job?",
  "What are you looking for in a new position?",
  "What type of work environment do you prefer?",
  "What’s your work style?",
  "What’s your management style?",
  "How would your boss and coworkers describe you?",
  "How do you deal with pressure or stressful situations?",
  "What do you like to do outside of work?",
  "Are you planning on having children?",
  "How do you stay organized?",
  "How do you prioritize your work?",
  "What are you passionate about?",
  "What motivates you?",
  "What are your pet peeves?",
  "How do you like to be managed?",
  "Do you consider yourself successful?",
  "Where do you see yourself in five years?",
  "How do you plan to achieve your career goals?",
  "What are your career aspirations?",
  "What’s your dream job?",
  "What other companies are you interviewing with?",
  "What makes you unique?",
  "What should I know that’s not on your resume?",
  "What would your first few months look like in this role?",
  "What are your salary expectations?",
  "What do you think we could do better or differently?",
];

const getRandomQuestion = () => {
  const random = Math.floor(Math.random() * interviewQuestions.length);
  return interviewQuestions[random];
};

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.setPrompt("Your response: ");

userInterface.on("line", async (input) => {
  const interviewQuestion = getRandomQuestion();

  const combinedPrompt = `Ask me an interview question and give me feedback on my response. This is the question: ${interviewQuestion}`;
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: combinedPrompt },
      { role: "user", content: input },
    ],
    max_tokens: 150,
    model: "gpt-3.5-turbo", // Updated model name
  });

  const feedback = completion.choices[0].message.content;
  console.log("AI Feedback:", feedback);
  userInterface.prompt();
});

userInterface.on("close", () => {
  console.log("Interview ended. Thank you!");
  process.exit(0);
});

userInterface.prompt();

// const getInitialResponse = async () => {
//   const initialResponse = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Test me.",
//       },
//     ],
//   });
//   return initialResponse.choices[0].message.content;
// };

// const userInterface1 = async () => {
//   try {
//     const interviewQuestion = getRandomQuestion();

//     const combinedPrompt = `I am creating an app that helps someone answer interviewing questions when you ask them the question first. Your instructions are to repeat the question then let them answer and you give them feedback. Repeat this question: ${interviewQuestion}`;

//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: combinedPrompt }],
//       model: "gpt-3.5-turbo",
//       max_tokens: 2040,
//       temperature: 0.1,
//     });
//     const modifiedAnswer = completion.choices[0].message.content;
//     console.log(modifiedAnswer);
//   } catch (error) {
//     console.error(error);
//     return "Error generating response";
//   }
// };

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

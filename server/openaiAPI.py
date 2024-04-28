import token
import openai
from dotenv import load_dotenv
import os
import random

load_dotenv()

api_key = os.getenv("OPEN_API_KEY")

openai.api_key = api_key

interviewQuestions = [
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
  "Why was there a gap in your employment?",
  "Can you explain why you changed career paths?",
  "What’s your current salary?",
  "What do you like least about your job?",
  "What are you looking for in a new position?",
  "What type of work environment do you prefer?",
  "What’s your work style?",
  "How would your boss and coworkers describe you?",
  "How do you deal with pressure or stressful situations?",
  "What do you like to do outside of work?",
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
]

def getRandomQuestion():
  randomQuestion = random.choice(interviewQuestions)
  return randomQuestion

initialQuestion = getRandomQuestion()

def userInterface():
    completion = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"You are a helpful assistant who will play the role of interviewer and respond back to the user with feedback to their response to better their interviewing skills. Ask the following question: ${initialQuestion}"},
            # {"role": "user", "content": ""}
        ],
        max_tokens=15,
        temperature=0.1,
    )
    feedback = completion.choices[0].message.content
    print(feedback)

def main():
    # print(f"AI question: {initialQuestion}")
    # user_input = input("Your response: ")
    userInterface()

main()
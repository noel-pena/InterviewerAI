import openai
from dotenv import load_dotenv
import os
import random

load_dotenv()

api_key = os.getenv("OPEN_API_KEY")

openai.api_key = api_key

techQuestions = ["Javascript", "SQL", "Computer Science", "React.js", "Python", "Java", "data structures" ]


def userInterface(user_input):
  completion = openai.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
          {"role": "system", "content": f"You are a helpful assistant who will play the role of interviewer and respond back to the user with feedback to their response to better their interviewing skills. Give them deep critism if needed. Do not ask followup questions, only provide feedback. Begin by asking a random interview question, then after the user responds, provide them with feedback, then move on to another question."},
          {"role": "user", "content": user_input}
      ],
      max_tokens=2040,
      temperature=0.1,
  )
  feedback = completion.choices[0].message.content
  return feedback

def userInterfacejs(user_input):
  completion = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": f"You are a helpful assistant who will play the role of interviewer and respond back to the user with feedback to their response to better their interviewing skills. Do not ask followup questions, only provide feedback. Start with a random the {techQuestions[0]}  question" },
      {"role": "user", "content": user_input}
    ],
    max_tokens=20,
    temperature=0.1
  )
  feedback = completion.choices[0].message.content
  return feedback
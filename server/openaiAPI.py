import openai
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("OPEN_API_KEY")

openai.api_key = api_key

savedQuestion = ""

def interviewerInterface(user_input, savedQuestion):
    try:
        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are a helpful assistant who will play the role of interviewer and respond back to the user with feedback to their response to better their interviewing skills. Give them deep critism if needed. Do not ask followup questions, only provide feedback. Begin by asking a random {savedQuestion} interview question, then after the user responds, provide them with feedback, then move on to the next question."},
                {"role": "user", "content": user_input}
            ],
            max_tokens=2040,
            temperature=0.1,
        )
        print("Received cat:", savedQuestion)
        feedback = completion.choices[0].message.content
        return feedback
    except Exception as e:
        print("Error in interviewerInterface:", e) 
        return str(e)

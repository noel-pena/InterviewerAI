import openai
from dotenv import load_dotenv
import os
from backend.question import get_random_question
import gc

load_dotenv()

api_key = os.getenv("OPEN_API_KEY")

openai.api_key = api_key

initial_question = None
current_question = None

def interviewerInterface(user_input, category):
    global initial_question, current_question
    
    try:
        if initial_question is None:
            initial_question = get_random_question(category)
            
        if current_question is None:
            current_question = initial_question
            
        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are a helpful assistant who will play the role of interviewer. Begin by asking a question, then wait for the user to give a response. Once you receive the response, then you will respond with feedback to better their interviewing skills using markdown text like lists, bold text, and italics. Do not ask follow up questions. If the user is not sure of the answer, give them the answer. If interviewee asks an irrelevant question, dont respond. The category of the interview: {category}. Your question to ask is: {current_question}."},
                {"role": "user", "content": user_input}
            ],
            max_tokens=2040,
            temperature=0.1,
        )
        print("Received cat:", category)
        feedback = completion.choices[0].message.content
        
        if completion.choices[0].message.role == "assistant":
            current_question = completion.choices[0].message.content
        if completion.choices[0].message.role == "assistant":
            current_question = initial_question
            initial_question = None

        print(f"init: {initial_question}, current: {current_question}")
        return feedback, current_question
    except Exception as e:
        print("Error in interviewerInterface:", e) 
        return str(e)



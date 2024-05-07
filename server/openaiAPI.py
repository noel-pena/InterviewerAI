import openai
from dotenv import load_dotenv
import os
from questions import get_random_question
import gc

load_dotenv()

api_key = os.getenv("OPEN_API_KEY")

openai.api_key = api_key

initial_question = None
current_question = None

def clear_memory():
    try:
        gc.collect()
        print("Memory cleared")
    except Exception as e:
        return print({"error": str(e)}), 500

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
                {"role": "system", "content": f"You are a helpful assistant who will play the role of interviewer. Begin by asking a question, then wait for the user to give a response. Once you receive the response, then you will respond with feedback to better their interviewing skills and make sure you are not asking follow up questions regarding the same question, then move on to the next question. If the user is not sure, give them the answer. The category of the interview: {category}. And begin the program by asking the following question: {current_question}."},
                {"role": "assistant", "content": "Hi! I will be assisting you with random questions. Feel free to tell me if you want another question! Let's begin."},
                {"role": "user", "content": user_input}
            ],
            max_tokens=2040,
            temperature=0.1,
        )
        print("Received cat:", category)
        feedback = completion.choices[0].message.content
        return feedback
    except Exception as e:
        print("Error in interviewerInterface:", e) 
        return str(e)
    finally:
        current_question = initial_question
        initial_question = None
        # clear_memory()
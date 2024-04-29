from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from openaiAPI import getRandomQuestion, userInterface
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/initial_question', methods=['GET'])
@cross_origin()
def get_initial_question():
    initial_question = getRandomQuestion()
    return jsonify({"initial_question": initial_question})

@app.route('/feedback', methods=['POST'])
def get_feedback():
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        print("Received user input:", user_input)
        feedback = userInterface(user_input)
        print("Generated feedback:", feedback)
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})



if __name__ == '__main__':
    host = os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_RUN_PORT", 8000))
    app.run(host=host, port=port)

# flask run --host=0.0.0.0 --port=8000
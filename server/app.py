from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from openaiAPI import userInterface
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/initial_question', methods=['GET'])
@cross_origin()
def get_initial_question():
    try:
        feedback = userInterface("") 
        return jsonify({"initial_question": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/feedback', methods=['POST'])
def get_feedback():
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        feedback = userInterface(user_input)
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    host = os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_RUN_PORT", 8000))
    app.run(host=host, port=port)

from unicodedata import category
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from openaiAPI import interviewerInterface
import os
from dotenv import load_dotenv


load_dotenv()

category_storage = {}

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/send_question', methods=['POST'])
@cross_origin()
def send_question():
    try:
        data = request.get_json()
        category = data.get("category")
        category_storage['savedQuestion'] = category
        feedback = interviewerInterface("", category)
        return jsonify({"initial_question": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

# General Interview
@app.route('/initial_question', methods=['GET'])
@cross_origin()
def get_initial_question():
    try:
        category = category_storage.get("savedQuestion", "")  # Get the category from the query parameters
        feedback = interviewerInterface("", category)
        return jsonify({"initial_question": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/feedback', methods=['POST'])
def get_feedback():
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        category_storage.get("savedQuestion", "")
        feedback = interviewerInterface(user_input, category)
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

#

if __name__ == '__main__':
    host = os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_RUN_PORT", 8000))
    app.run(host=host, port=port)
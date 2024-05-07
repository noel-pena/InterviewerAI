from unicodedata import category
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from backend.openai import interviewerInterface
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

category_storage = {"savedQuestion": None}

@app.route('/send_question', methods=['POST'])
@cross_origin()
def send_question():
    try:
        data = request.get_json()
        selected_category = data.get("category")
        category_storage['savedQuestion'] = selected_category
        return jsonify({"initial_question": "Category saved!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/initial_question', methods=['GET'])
@cross_origin()
def get_initial_question():
    try:
        saved_category = category_storage.get("savedQuestion", category)
        feedback = interviewerInterface("", saved_category)
        return jsonify({"initial_question": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/feedback', methods=['POST'])
def get_feedback():
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        saved_category = category_storage.get("savedQuestion", category)
        feedback = interviewerInterface(user_input, saved_category)
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})


# curl -X POST http://localhost:8000/clear-memory

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
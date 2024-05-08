import os
from unicodedata import category
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from backend.openai import interviewerInterface
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

category_storage = {"savedQuestion": None}

@app.route('/api/send_question', methods=['POST'])
@cross_origin()
def send_question():
    try:
        data = request.get_json()
        selected_category = data.get("category")
        category_storage['savedQuestion'] = selected_category
        return jsonify({"initial_question": "Category saved!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/initial_question', methods=['GET'])
@cross_origin()
def get_initial_question():
    try:
        saved_category = category_storage.get("savedQuestion", category)
        feedback = interviewerInterface("", saved_category)
        return jsonify({"initial_question": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/feedback', methods=['POST'])
def get_feedback():
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        saved_category = category_storage.get("savedQuestion", category)
        feedback = interviewerInterface(user_input, saved_category)
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/")
def index():
    return send_from_directory(os.path.join("backend", "dist"), "index.html")

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(os.path.join("backend", "dist"), filename)

if __name__ == '__main__':
    app.run(port=8080)
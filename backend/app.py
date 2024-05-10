import os
from flask import Flask, request, jsonify, send_from_directory, session
from flask_cors import CORS, cross_origin
from backend.openai import interviewerInterface
from dotenv import load_dotenv
import gc
import secrets

load_dotenv()

app = Flask(__name__, static_folder='backend/dist')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = secrets.token_hex(16)

category_storage = {}

def clear_memory():
    try:
        gc.collect()
        print("Memory cleared")
    except Exception as e:
        print({"error": str(e)}), 500

@app.route('/api/send_question', methods=['POST'])
@cross_origin()
def send_question():
    global category_storage
    try:
        data = request.get_json()
        selected_category = data.get("category")
        session['saved_category'] = selected_category
        category_storage[session.sid] = selected_category
        return jsonify({"initial_question": "Category saved!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/initial_question', methods=['GET'])
@cross_origin()
def get_initial_question():
    global category_storage
    try:
        saved_category = session.get("saved_category", "")
        feedback, current_question = interviewerInterface("", saved_category)
        print("Saved category from flask:", saved_category)
        return jsonify({"initial_question": feedback, "category": saved_category, "current_question": current_question})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/feedback', methods=['POST'])
def get_feedback():
    global category_storage
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        saved_category = session.get("saved_category", "")
        feedback, current_question = interviewerInterface(user_input, saved_category)
        return jsonify({"feedback": feedback, "current_question": current_question})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/")
def index():
    global category_storage
    clear_memory()
    print("Category storage:", category_storage)  
    return send_from_directory("dist", "index.html")

@app.route("/assets/<path:filename>")
def serve_static(filename):
    return send_from_directory(os.path.join("dist", "assets"), filename)

if __name__ == '__main__':
    app.run()

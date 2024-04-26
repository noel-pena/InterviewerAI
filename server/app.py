from flask import Flask, request, jsonify
from flask_cors import CORS
from openaiAPI import getRandomQuestion, userInterface, initialQuestion

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/api/initial_question', methods=['GET'])
def get_initial_question():
    initial_question = getRandomQuestion()
    print(f"the initial question: {initial_question}")
    return jsonify({"intial_question": initial_question})

# @app.route('/api/feedback', methods=['POST'])
# def get_feedback():
#     try:
#         data = request.get_json()
#         user_input = data.get('user_input')
#         feedback = userInterface(user_input)
#         return jsonify({"feedback": feedback})
#     except Exception as e:
#         return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
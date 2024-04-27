from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from openaiAPI import getRandomQuestion, userInterface, initialQuestion

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
        feedback = userInterface(user_input)
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True,port=8000)

# flask run --host=0.0.0.0 --port=8000
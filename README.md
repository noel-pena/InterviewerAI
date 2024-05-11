# InterviewerAI

Interviewer AI is an application that leverages OpenAI's API to simulate an interview experience. The application prompts users with questions and provides feedback based on their responses, creating a simulated interview scenario.

## Features

- **Interview Simulation:** Engage in a simulated interview experience where the AI asks questions and provides feedback.
- **OpenAI Integration:** Utilizes OpenAI's API to generate questions and provide responses.
- **User Interaction:** Allows users to respond to interview questions and receive feedback.
- **Python Flask Backend:** Backend server built using Flask to handle API requests and responses.
- **Vite React Frontend:** User interface developed using React for an interactive experience.

## Installation or Live Site

Live site: https://interviewerai.onrender.com/

Or

To run the Interviewer AI application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/noel-pena/InterviewerAI.git

   ```

2. Install backend dependencies from backend folder:

   ```bash
   pip install -r requirements.txt
   ```

3. Install frontend dependencies from root:

   ```bash
   npm i
   ```

4. Preferred method: Run the app through production:

   ```bash
   npm run build
   ```

5. Run Flask from backend:
   ```bash
   Flask run
   ```

## Code Structure

### Backend(Python Flask)

```bash
/backend
├── app.py # Flask routes
├── openai.py # Python module for interacting with OpenAI API
├── question.py # Module for handling interview questions
└── requirements.txt # Backend dependencies
```

### Frontend(Vite React)

```bash
/InterviewerAI
└── frontend
├── components
│ ├── subcomponents
│ │ ├── AI.jsx # Inputs from openaAI and user responses
│ │ ├── ModernButton.jsx # Begin button
│ │ ├── Selection.jsx # Category selection
│ │ ├── SendButton.jsx # Send button inside of the text input
│ │ ├── TextBox.jsx # Where the user inputs their reponse. API post route
│ │ ├── Title.jsx # "InterviewerAI" clickable title that routes to "/"
│ │ └── Typewriter.jsx #Typewriting effect from AI responses
│ ├── App.css # Main stylesheet
│ ├── App.jsx # Main App.jsx file
│ └── main.jsx # Loading of ReactDOM
└── package.json
```

## App Overview:

### Started.jsx

This component manages the state of the application, including whether the button has been clicked, loading state, feedback from the AI, current question, user inputs, and selected category. It contains event handlers for category changes, button clicks, and feedback updates. The JSX renders different components based on the application state, including the Title component, AI component, TextBox component, Selection component, and ModernButton component.

```javascript
<Grid
  container
  flexDirection="column"
  sx={{
    justifyContent: buttonClicked ? "space-between" : "center",
    alignItems: "center",
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
  }}
>
  <Grid item sx={{ maxHeight: buttonClicked ? "0vh" : "0" }}>
    <Title />
  </Grid>
  {isLoading ? (
    <CircularProgress color="success" size={40} />
  ) : buttonClicked ? (
    <>
      <Grid
        item
        p={0}
        mt={1}
        className="output"
        textAlign="center"
        sx={{
          height: "75vh",
          maxHeight: "calc(70vh - 7.5rem)",
          overflowY: "auto",
          width: "100%",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
        ref={gridRef}
      >
        <AI
          feedback={feedback}
          currentQuestion={currentQuestion}
          userInputs={userInputs}
          category={category}
        />
      </Grid>
      <Grid item pt={5}>
        <TextBox
          onCurrentQuestion={handleCurrentQuestion}
          onFeedback={handleFeedback}
          onUserInput={handleUserInputs}
        />
      </Grid>
    </>
  ) : (
    <>
      <Grid item pt={2}>
        <Selection
          onCategoryChange={handleCategoryChange}
          selectedCategory={category}
        />
      </Grid>
      {category && (
        <Grid item pt={3}>
          <ModernButton onClick={handleButtonClick} />
        </Grid>
      )}
    </>
  )}
</Grid>
```

### app.py

This backend code sets up a Flask server to handle API requests for the Interviewer AI application. It includes routes for sending questions, getting initial questions, and receiving feedback. The code manages session data to store the selected category and interacts with an abstracted python module (openai.py) to handle interview logic. Additionally, it serves the frontend files and clears memory periodically to maintain performance.

```python
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

```

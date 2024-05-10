import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { SendButton } from "./SendButton";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export const TextBox = ({ onFeedback, onUserInput, onCurrentQuestion }) => {
  const [text, setText] = useState("");
  const [userInputs, setUserInputs] = useState([]);

  const maxCharLimit = 400;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const truncatedValue = inputValue.slice(0, maxCharLimit);
    inputValue.length <= maxCharLimit
      ? setText(inputValue)
      : setText(truncatedValue);
  };

  const addToUserInputs = () => {
    setUserInputs((prevInputs) => {
      const updatedInputs = [...prevInputs, text];
      return updatedInputs;
    });
  };

  const handleSendClick = async (e) => {
    e.preventDefault();
    try {
      if (text.trim() === "") {
        return;
      }
      addToUserInputs();
      const res = await axios.post("/api/feedback", {
        user_input: text,
      });

      const { feedback, current_question: currentQuestion } = res.data;
      onFeedback(feedback, text);
      onCurrentQuestion(currentQuestion);
      onUserInput(userInputs.concat(text));
      console.log(`feedback: ${feedback}, currentQuestion: ${currentQuestion}`);
      setText("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="input-container">
      <form>
        <span
          className="char"
          style={{
            position: "relative",
            top: 0,
            left: -40,
          }}
        >
          {text.length}/{maxCharLimit}
        </span>
        <TextareaAutosize
          type="text"
          name="text"
          className="input"
          placeholder="Type here"
          value={text}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendClick(e);
            }
          }}
          required
        />
        <SendButton onClick={(e) => handleSendClick(e)} />
      </form>
    </div>
  );
};

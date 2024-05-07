import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { SendButton } from "./SendButton";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export const TextBox = ({ onFeedback, onUserInput }) => {
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

  const handleSendClick = async () => {
    try {
      if (text.trim() === "") {
        return;
      }
      addToUserInputs();
      const res = await axios.post("http://localhost:8000/feedback", {
        user_input: text,
      });

      const feedback = res.data.feedback;
      onFeedback(feedback, text);
      onUserInput(userInputs.concat(text));
      console.log(`feedback: ${feedback}, text: ${text}`);
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
            fontSize: "0.75rem",
            position: "relative",
            top: 0,
            left: -50,
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
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendClick();
            }
          }}
          required
        />
        <SendButton onClick={handleSendClick} />
      </form>
    </div>
  );
};

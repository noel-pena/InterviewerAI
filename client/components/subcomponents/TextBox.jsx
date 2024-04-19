import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { SendButton } from "./SendButton";

export const TextBox = () => {
  const [text, setText] = useState("");
  const maxCharLimit = 400;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const truncatedValue = inputValue.slice(0, maxCharLimit);
    inputValue.length <= maxCharLimit
      ? setText(inputValue)
      : setText(truncatedValue);
  };

  return (
    <div className="input-container">
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
      />
      <SendButton onClick={null} />
    </div>
  );
};

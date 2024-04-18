import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import annyang from "annyang"; // Import the annyang library

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

  const handleIconClick = () => {
    try {
      // Initialize annyang
      if (annyang) {
        annyang.setLanguage("en-US");

        // Define voice commands
        const commands = {
          // Use a more specific command pattern
          "type *input": (input) => {
            setText(input); // Update the text with recognized speech
          },
        };

        // Add commands to annyang
        annyang.addCommands(commands);

        // Start listening
        annyang.start({ autoRestart: true, cotinuous: false });
      }
    } catch (error) {
      console.error("Speech recognition error:", error);
    }
  };

  annyang.abort();

  useEffect(() => {
    // Clean up annyang when component unmounts
    return () => {
      if (annyang) {
        annyang.abort();
      }
    };
  }, []);

  return (
    <>
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
        <KeyboardVoiceIcon
          fontSize="large"
          className="svg-icon"
          onClick={handleIconClick}
        />
      </div>
    </>
  );
};

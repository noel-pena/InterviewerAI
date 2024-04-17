import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

export const TextBox = () => {
  const handleIconClick = () => {
    // Handle the click event (e.g., open a modal, navigate, etc.)
    console.log("SVG icon clicked!");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        name="text"
        className="input"
        placeholder="Type here"
      />
      <KeyboardVoiceIcon className="svg-icon" onClick={handleIconClick} />
    </div>
  );
};

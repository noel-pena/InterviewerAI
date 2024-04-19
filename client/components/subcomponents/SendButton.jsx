import SendIcon from "@mui/icons-material/Send";

// eslint-disable-next-line react/prop-types
export const SendButton = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <SendIcon className="svg-icon" />
      </button>
    </>
  );
};

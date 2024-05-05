import { useEffect, useRef, useState } from "react";
import { Title } from "./subcomponents/Title";
import { AI } from "./AI";
import { ModernButton } from "./subcomponents/ModernButton";
import { Grid, CircularProgress } from "@mui/material";
import { TextBox } from "./subcomponents/TextBox";
import { Selection } from "./subcomponents/Selection";

export const Started = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userInputs, setUserInputs] = useState([]);
  const [category, setCategory] = useState("");

  const gridRef = useRef(null);

  const scrollToBottom = () => {
    if (gridRef.current) {
      const gridContainer = gridRef.current;
      gridContainer.scrollTop = gridContainer.scrollHeight;
    }
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setButtonClicked(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleFeedback = (feedback, text) => {
    setFeedback(feedback);
    setUserInputs((prevUserInputs) => [...prevUserInputs, text]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [feedback, userInputs]);

  const handleUserInputs = () => {};
  return (
    <Grid
      container
      gap={10}
      flexDirection="column"
      sx={{
        justifyContent: buttonClicked ? "space-between" : "center",
        alignItems: "center",
        minHeight: "100vh",
        flex: 1,
        overflow: "hidden",
      }}
    >
      <Grid item sx={{ maxHeight: buttonClicked ? "5vh" : "0" }}>
        <Title />
      </Grid>
      {isLoading ? (
        <CircularProgress color="success" size={40} />
      ) : buttonClicked ? (
        <>
          <Grid
            item
            p={0}
            className="output"
            textAlign="center"
            sx={{
              height: "75vh",
              maxHeight: "calc(75vh - 120px)",
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
              userInputs={userInputs}
              category={category}
            />
          </Grid>
          <Grid item pt={5}>
            <TextBox
              onFeedback={handleFeedback}
              onUserInput={handleUserInputs}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <Selection onCategoryChange={handleCategoryChange} />
          </Grid>
          <Grid item>
            <ModernButton onClick={handleButtonClick} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

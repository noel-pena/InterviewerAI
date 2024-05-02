import { useState } from "react";
import { Title } from "./subcomponents/Title";
import { AI } from "./AI";
import { ModernButton } from "./subcomponents/ModernButton";
import { Grid, CircularProgress } from "@mui/material";
import { TextBox } from "./subcomponents/TextBox";

export const Started = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userInputs, setUserInputs] = useState([]);

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

  const handleUserInputs = () => {};
  return (
    <Grid
      container
      gap={3}
      flexDirection="column"
      sx={{
        justifyContent: buttonClicked ? "space-around" : "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid item>
        <Title />
      </Grid>
      {isLoading ? (
        <CircularProgress color="success" size={40} />
      ) : buttonClicked ? (
        <>
          <Grid item className="output" textAlign="center">
            <AI feedback={feedback} userInputs={userInputs} />
          </Grid>
          {/* <Grid item pb={5}>
            {feedback && <NextButton onClick={handleNextClick} />}
          </Grid> */}
          <Grid item pt={5}>
            <TextBox
              onFeedback={handleFeedback}
              onUserInput={handleUserInputs}
            />
          </Grid>
        </>
      ) : (
        <Grid item>
          <ModernButton onClick={handleButtonClick} />
        </Grid>
      )}
    </Grid>
  );
};

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

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setButtonClicked(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleFeedback = (feedback) => {
    setFeedback(feedback);
  };

  return (
    <Grid
      container
      gap={3}
      flexDirection="column"
      sx={{
        justifyContent: buttonClicked ? "space-between" : "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid item>
        <Title />
      </Grid>
      {isLoading ? (
        <CircularProgress color="success" size={60} />
      ) : buttonClicked ? (
        <>
          <Grid item className="output" textAlign="center">
            <AI feedback={feedback} />
          </Grid>
          <Grid item pb={5}>
            <TextBox onFeedback={handleFeedback} />
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

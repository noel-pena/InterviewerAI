import { useState } from "react";
import { Title } from "./subcomponents/Title";
import { AI } from "./AI";
import { ModernButton } from "./subcomponents/ModernButton";
import { Grid, CircularProgress } from "@mui/material";
import { TextBox } from "./subcomponents/TextBox";

export const Started = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setButtonClicked(true);
      setIsLoading(false);
    }, 1000);

    // You can replace the setTimeout with your actual data fetching logic
  };

  return (
    <Grid
      container
      gap={5}
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
        <Grid item>
          <CircularProgress color="success" />
        </Grid>
      ) : buttonClicked ? (
        <>
          <Grid item className="output" textAlign="center">
            <AI />
          </Grid>
          <Grid item pb={5}>
            <TextBox />
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

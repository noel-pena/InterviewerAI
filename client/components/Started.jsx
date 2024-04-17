import { useState } from "react";
import { Title } from "./subcomponents/Title";
import { ModernButton } from "./subcomponents/ModernButton";
import { Grid } from "@mui/material";
import { TextBox } from "./subcomponents/TextBox";

export const Started = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
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
      {buttonClicked ? (
        <Grid item pb={5}>
          <TextBox />
        </Grid>
      ) : (
        <Grid item>
          <ModernButton onClick={handleButtonClick} />
        </Grid>
      )}
    </Grid>
  );
};

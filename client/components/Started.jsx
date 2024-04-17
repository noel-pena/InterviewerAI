import { useState } from "react";
import { Title } from "./subcomponents/Title";
import { ModernButton } from "./subcomponents/ModernButton";
import { Grid } from "@mui/material";

export const Started = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [justifyContent, setJustifyContent] = useState("center");

  const handleButtonClick = () => {
    setButtonClicked(true);
    setJustifyContent(null);
  };

  return (
    <Grid
      container
      gap={5}
      flexDirection="column"
      sx={{
        justifyContent: justifyContent,
        alignItems: "center",
        height: "100vh",
      }}
    >
      {buttonClicked ? (
        <Grid item>
          <Title />
        </Grid>
      ) : (
        <>
          <Grid Item>
            <Title />
          </Grid>
          <Grid Item>
            <ModernButton onClick={handleButtonClick} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

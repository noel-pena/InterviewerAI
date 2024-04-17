import { Grid } from "@mui/material";
import { ModernButton } from "./subcomponents/ModernButton";

export const Starter = () => {
  return (
    <Grid
      container
      gap={5}
      flexDirection="column"
      sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <Grid item>
        <h1
          style={{
            fontWeight: 400,
            fontSize: "3rem",
            letterSpacing: "0.25rem",
            textAlign: "center",
          }}
        >
          Interviewer<span className="AI">AI</span>
        </h1>
        <h2
          style={{
            fontWeight: 200,
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Your interviewing AI assistant
        </h2>
      </Grid>
      <Grid item>
        <ModernButton />
      </Grid>
    </Grid>
  );
};

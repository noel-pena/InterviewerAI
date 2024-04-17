import { Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <>
      <hr className="line2" />
      <Grid
        container
        p={4}
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={6}
          style={{
            color: "rgb(232, 232, 232)",
            fontWeight: 200,
            fontSize: "12px",
            textAlign: "left",
          }}
        >
          NPX | Copyright © {year}
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <a href="https://github.com/noel-pena">
            <GitHubIcon className="footer-icons" />
          </a>
          <a href="https://www.instagram.com/i_am_omen/">
            <InstagramIcon className="footer-icons" />
          </a>
          <a href="https://linkedin.com/in/noel-pena-1138aa167">
            <LinkedInIcon className="footer-icons" />
          </a>
          <a href="mailto:noel.pena@hotmail.com">
            <EmailIcon className="footer-icons" />
          </a>
        </Grid>
      </Grid>
    </>
  );
};

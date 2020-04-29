import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  startpage: {
    paddingBottom: "20px",
    backgroundColor: "#000",
    textAlign: "center",
    opacity: "0.7",
  },
}));

export const StartPage: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <div id="homePageBackground">
      <Container className={classes.startpage} maxWidth="sm">
        <Typography variant="h4">Welcome to BIMGEN</Typography>
        <Typography variant="subtitle1">Coming soon...</Typography>
        <Link variant="body1" href="/auth/login">
          RFA web editor
        </Link>
      </Container>
      <div className="homePageBackgroundLogo"></div>
    </div>
  );
});

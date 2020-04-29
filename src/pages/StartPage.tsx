import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  startpage: {
    paddingTop: "20px",
    paddingBottom: "30px",
    alignContent: "center"
  },
}));

export const StartPage: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <div className="homePageBackgroundLogo">
      <Container className={classes.startpage} component="main" maxWidth="sm" style={{opacity: "0.8"}}>
        <Typography variant="h4">Welcome to BIMGEN homepage</Typography>
        <Typography variant="subtitle1">This is text to check changes and correct</Typography>
        <Link variant="body1" href="/auth/login">Go to rfa editor</Link>
      </Container>
      <div className="homePageBackground"></div>
    </div>
  );
});

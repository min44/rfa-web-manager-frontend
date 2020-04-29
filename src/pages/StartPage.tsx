import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  startpage: {
    paddingTop: "50px",
    paddingBottom: "50px",
    alignContent: "center",
  },
}));

export const StartPage: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <div className="homePageBackgroundLogo">
      <Container className={classes.startpage} component="main" maxWidth="sm" style={{opacity: "0.8"}}>
        <Typography variant="h4">Welcome to main page Bim Gen LLC</Typography>
        <Typography variant="body1">This is text to chek changes and correct</Typography>
        <Link href="/auth/login">Go to rfa editor</Link>
      </Container>
      <div className="homePageBackground"></div>
    </div>
  );
});

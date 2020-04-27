import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  startpage: {
    paddingTop: "100px",
  },
}));

export const StartPage: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <Container className={classes.startpage} component="main" maxWidth="sm">
      <Typography variant="h4">Welcome to main page Bim Gen LLC</Typography>
      <Link href="/auth/login" variant="h3">
        to rfa editor
      </Link>
    </Container>
  );
});

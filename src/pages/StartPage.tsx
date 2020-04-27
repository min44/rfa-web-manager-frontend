import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStores } from "../hooks/strores.hook";

const useStyles = makeStyles((theme) => ({
  startpage: {
    paddingTop: "100px",
  },
}));

export const StartPage: React.FC = observer(() => {
  const classes = useStyles();

  const preventDefault = (e: { preventDefault: () => any }) => e.preventDefault();

  return (
    <Container className={classes.startpage} component="main" maxWidth="sm">
      <Typography variant="h4">Welcome to main page Bim Gen LLC</Typography>
      <Link href="/auth/login" variant="h3">
        to rfa editor
      </Link>
    </Container>
  );
});

import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export const Title: React.FC = () => {
  const classes = useStyles();

  const curentTitle =
    window.location.pathname.split("/").toString().charAt(1).toUpperCase() +
    window.location.pathname.split("/").toString().slice(2) +
    " page";

  return <Typography className={classes.title} variant="h6">{curentTitle}</Typography>;
};

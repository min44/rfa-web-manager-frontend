import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

export function BasicTextFields(props: any) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label={props.name}
        size="small"
        variant="filled"
        onChange={(e) => {
          props.onChangeHandler(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            props.onSubmitEventHandler();
          }
        }}
      />
    </form>
  );
}

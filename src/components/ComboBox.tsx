/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { IUser } from "../react-app-env";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

interface IComboBoxParams {
  data: IUser[];
  onChange: (id: string) => void;
}

export const ComboBox: React.FC<IComboBoxParams> = ({ data, onChange }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: 300 }}
      options={data}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      //   value={value}
      onChange={(event: any, newValue: IUser | null) => {
        console.log(newValue);
        if (newValue) {
          onChange(newValue._id);
        }
      }}
      getOptionLabel={(option) => option.email}
      renderOption={(option) => <React.Fragment>{option.email}</React.Fragment>}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose user"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

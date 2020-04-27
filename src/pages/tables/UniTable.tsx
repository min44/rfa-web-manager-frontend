import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react";
import { TableHead, TableRow, TableCell, TableBody, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 550,
  },
}));

export const UniTable = observer((props: any) => {
  const classes = useStyles();

  const UniTableHead = (props: any) => {
    return props.headers.map((header: string, index: number) => <TableCell key={index}>{header}</TableCell>);
  };

  const UniTableBody = (props: any) => {
    const handleDeleteRow = (_id: string) => props.deleteFunction(_id);
    return props.body.map((row: any, index: number) => (
      <TableRow key={index}>
        <TableCell>
          <IconButton aria-label="delete" onClick={() => handleDeleteRow(row[props.idkey])}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <UniTableRows cells={Object.values(row)} />
      </TableRow>
    ));
  };

  const UniTableRows = (props: any) => {
    return props.cells.map((cell: any, index: number) => (
      <TableCell key={index} align="left">
        {cell}
      </TableCell>
    ));
  };

  return props.data.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <UniTableHead headers={Object.keys(props.data[0])} />
          </TableRow>
        </TableHead>
        <TableBody>
          <UniTableBody body={props.data} deleteFunction={props.deleteFunction} idkey={props.idkey} />
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Sorry table is emty</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
});

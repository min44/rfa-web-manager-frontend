import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react";
import { TableHead, TableRow, TableCell, TableBody, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LoaderMini from "../../components/LoaderMini";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 550,
  },
  tableContainer: {
    marginBottom: "25px",
    marginTop: "10px",
  },
}));

export const CommonTable = observer((props: any) => {
  const classes = useStyles();

  if (props.filter) {
    props.data.forEach((item: any) => props.filter.forEach((filterCol: any) => delete item[filterCol]));
  }

  const CommonTableHead = (props: any) => {
    const headers = props.headers;
    return headers.map((header: string, index: number) => {
      return <TableCell key={index}>{header}</TableCell>;
    });
  };

  const CommonTableBody = (props: any) => {
    const handleDeleteRow = (_id: string) => props.deleteFunction(_id);
    return props.body.map((row: any, index: number) => (
      <TableRow key={index}>
        <CommonTableRows cells={Object.values(row)} />
        <TableCell align="right">
          <IconButton aria-label="delete" onClick={() => handleDeleteRow(row[props.idkey])}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  const CommonTableRows = (props: any) => {
    return props.cells.map((cell: any, index: number) => (
      <TableCell key={index} align="left">
        {cell.toString()}
      </TableCell>
    ));
  };

  return props.state === "fulfilled" ? (
    props.data.length > 0 ? (
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <CommonTableHead headers={Object.keys(props.data[0])} />
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CommonTableBody body={props.data} deleteFunction={props.deleteFunction} idkey={props.idkey} />
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography> No data </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    )
  ) : (
    <Paper>
      <LoaderMini />
    </Paper>
  );
});

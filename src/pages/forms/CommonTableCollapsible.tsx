import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Collapse, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { observer } from "mobx-react";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
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

export const CommonTableCollapsible = observer((props: any) => {
  const classes = useStyles();

  props.secondData.forEach((item: any) => props.secondFilter.forEach((filterCol: any) => delete item[filterCol]));

  const CommonTableHead = (props: any) => {
    const headers = props.headers;
    return headers.map((header: string, index: number) => {
      return <TableCell key={index}>{header}</TableCell>;
    });
  };

  const CommonTableBody = (props: any) => {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <CommonTableRows cells={Object.values(props.mainRow)} />
          <TableCell align="right">
            <IconButton aria-label="delete" onClick={() => props.mainDelete(props.mainRow[props.mainId])}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          {props.secondData.filter((item: any) => item.bucketKey === props.mainRow.bucketKey).length > 0 ? (
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <CommonTableHead headers={Object.keys(props.secondData[0])} />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <CommonTableBodySecond
                        secondId={props.secondId}
                        secondData={props.secondData.filter(
                          (item: any) => item.bucketKey === props.mainRow.bucketKey
                        )}
                        secondDelete={props.secondDelete}
                      />
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          ) : (
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Typography> No data </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          )}
        </TableRow>
      </React.Fragment>
    );
  };

  const CommonTableBodySecond = (props: any) => {
    return props.secondData.map((secondRow: any, index: number) => (
      <TableRow key={index}>
        <CommonTableRows cells={Object.values(secondRow)} />
        <TableCell align="left">
          <IconButton
            aria-label="delete"
            onClick={() => props.secondDelete(secondRow.bucketKey, secondRow[props.secondId])}
          >
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

  return props.mainData.length > 0 ? (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <CommonTableHead headers={Object.keys(props.mainData[0])} />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.mainData.map((mainRow: any, index: number) => (
            <CommonTableBody
              key={index}
              mainRow={mainRow}
              mainId={props.mainId}
              mainDelete={props.mainDelete}
              secondId={props.secondId}
              secondData={props.secondData}
              secondDelete={props.secondDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography> No data </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
});

import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../hooks/strores.hook";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { Board } from "../components/Board";
import { Card } from "../components/Card";
import Loader from "../components/Loader";

const useStyles = makeStyles({
  flexbox: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1000px",
    height: "85vh",
    overflow: "hidden",
    margin: "0 auto",
    padding: "15px",
    "& .board": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "300px",
      backgroundColor: "#525252",
      padding: "15px",
      "& .card": {
        padding: "5px 20px",
        backgroundColor: "#706868",
        cursor: "pointer",
        marginBottom: "10px",
      },
    },
  },
});

export const ParameterManagementPage: React.FC = observer((props: any) => {
  const { forgeStore } = useStores();
  const classes = useStyles();

  const Boards = (props: any) => {
    return props.parametersJsonFiles.map((parametersJsonFile: any, index: number) => (
      <Board id={`board-${index + 1}`} className="board" key={index}>
        <Cards parametersJsonFile={parametersJsonFile} key={index} />
      </Board>
    ));
  };

  const Cards = (props: any) => {
    return props.parametersJsonFile.map((parameter: any, index: number) => (
      <Card id={`card-${index + 1}`} className="card" draggable="true" key={index}>
        <Typography variant="body2">{parameter.name}</Typography>
      </Card>
    ));
  };

  return (forgeStore.extractedParametersFilesState.state === "fulfilled" ? (
    <Container>
      <div className={classes.flexbox}>
        <Boards parametersJsonFiles={forgeStore.extractedParametersFiles} />
      </div>
    </Container>
  ) : (
    <Loader />
  ))
});

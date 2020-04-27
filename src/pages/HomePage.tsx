import React from "react";
import { observer } from "mobx-react";
import Dashboard from "../components/Dashboard";
import { Container, Typography } from "@material-ui/core";

export const HomePage: React.FC = observer(() => {
  return (
    <Container>
      <Typography variant="h4">Home Page</Typography>
    </Container>
  );
});

import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useStores } from "../hooks/stores.hook";
import { observer } from "mobx-react";
import {SearchResults} from "../components/Families";

interface IParamEditorPageProps {}

export const ParamEditorPage: React.FC<IParamEditorPageProps> = observer(() => {
  const {forgeStore } = useStores()

  return (
    <Container>
      <Typography variant="h5">NewParamEditPage</Typography>
      <SearchResults/>
    </Container>
  );
})

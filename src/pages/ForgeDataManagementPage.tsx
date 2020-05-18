import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { CommonTable } from "./forms/CommonTable";
import { useStores } from "../hooks/strores.hook";
import { observer } from "mobx-react";

export const ForgeDataManagementPage: React.FC = observer(() => {
  const { forgeStore } = useStores();

  return (
    <Container style={{ marginBottom: "100px" }}>
      <CssBaseline />
      <Typography variant="h5">User objects</Typography>
      <CommonTable data={forgeStore.objects} deleteFunction={forgeStore.deleteObject} idkey={"objectKey"} filter={["objectId", "sha1", "location"]}/>
    </Container>
  );
});

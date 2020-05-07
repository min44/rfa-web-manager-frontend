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
    <Container>
      <CssBaseline />
      <Typography variant="h5" gutterBottom>
        State: {forgeStore.bucketsState.state === "fulfilled" ? "Loading complete" : forgeStore.bucketsState.state}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Application Nickname: {forgeStore.forgeAppName}
      </Typography>
      <Typography variant="h5">Buckets</Typography>
      <CommonTable data={forgeStore.buckets} deleteFunction={forgeStore.deleteBucket} idkey={"bucketKey"} />
      <Typography variant="h5">Objects</Typography>
      <CommonTable data={forgeStore.objects} deleteFunction={forgeStore.deleteObject} idkey={"objectKey"} />
    </Container>
  );
});

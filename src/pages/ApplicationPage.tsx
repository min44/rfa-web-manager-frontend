import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { UniTable } from "./tables/UniTable";
import { useStores } from "../hooks/strores.hook";
import { observer } from "mobx-react";

export const ApplicationPage: React.FC = observer(() => {
  const { forgeStore, adminStore } = useStores();

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h5" gutterBottom>
        State:{" "}
        {forgeStore.forgeAppNameState.state === "fulfilled"
          ? "Loading complete"
          : forgeStore.forgeAppNameState.state}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Name: {forgeStore.forgeAppName}
      </Typography>
      <Typography variant="h5">Users</Typography>
      <UniTable data={adminStore.users} deleteFunction={adminStore.deleteUser} idkey={"_id"} />
      <Typography variant="h5">Buckets</Typography>
      <UniTable data={forgeStore.buckets} deleteFunction={forgeStore.deleteBucket} idkey={"bucketKey"} />
      <Typography variant="h5">Objects</Typography>
      <UniTable data={forgeStore.objects} deleteFunction={forgeStore.deleteObject} idkey={"objectKey"} />
    </Container>
  );
});

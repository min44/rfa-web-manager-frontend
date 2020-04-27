import React from "react";
import { observer } from "mobx-react";
import Dashboard from "../components/Dashboard";
import { Typography, Container } from "@material-ui/core";
import { useStores } from "../hooks/strores.hook";
import { UniTable } from "./tables/UniTable";

export const AdminPage: React.FC = observer(() => {
  const { adminStore, forgeStore } = useStores();

  return (
      <Container>
        <Typography variant="h6" gutterBottom>
          State:{" "}
          {forgeStore.forgeAppNameState.state === "fulfilled"
            ? "Loading complete"
            : forgeStore.forgeAppNameState.state}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Application nickname: {forgeStore.forgeAppName}
        </Typography>
        <Typography variant="h6">Buckets</Typography>
        <UniTable data={forgeStore.buckets} deleteFunction={forgeStore.deleteBucket} idkey={"bucketKey"} />
        <Typography variant="h6">Users</Typography>
        <UniTable data={adminStore.users} deleteFunction={adminStore.deleteUser} idkey={"_id"} />
      </Container>
  );
});

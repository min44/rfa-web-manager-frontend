import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { CommonTable } from "./forms/CommonTable";
import { useStores } from "../hooks/strores.hook";
import { observer } from "mobx-react";

export const StoragePage: React.FC = observer(() => {
  const { forgeStore } = useStores();

  return (
    <Container style={{ marginBottom: "100px" }}>
      <CssBaseline />
      <Typography variant="h5">Families</Typography>
      <CommonTable
        data={forgeStore.objects.filter((item: any) => item.objectKey?.includes(".rfa"))}
        deleteFunction={forgeStore.deleteObject}
        idkey={"objectKey"}
        filter={["objectId", "sha1", "location"]}
        state={forgeStore.objectsState.state}
      />
      <Typography variant="h5">Parameter set</Typography>
      <CommonTable
        data={forgeStore.objects.filter((item: any) => item.objectKey?.includes(".json"))}
        deleteFunction={forgeStore.deleteObject}
        idkey={"objectKey"}
        filter={["objectId", "sha1", "location"]}
        state={forgeStore.objectsState.state}
      />
    </Container>
  );
});

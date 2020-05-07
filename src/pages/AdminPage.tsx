import React, { useState } from "react";
import { observer } from "mobx-react";
import { Typography, Container, Button, CssBaseline } from "@material-ui/core";
import { useStores } from "../hooks/strores.hook";
import { CommonTable } from "./forms/CommonTable";
import { BasicTextFields } from "../components/TextField";

export const AdminPage: React.FC = observer(() => {
  const { adminStore, forgeStore } = useStores();
  const [appNickname, setappNickname] = useState("");

  const onChangeAppNickname = (name: string) => {
    setappNickname(name);
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h6" gutterBottom>
        State:{" "}
        {forgeStore.forgeAppNameState.state === "fulfilled"
          ? "Loading complete"
          : forgeStore.forgeAppNameState.state}
      </Typography>
      <div style={{ display: "flex" }}>
        <BasicTextFields name="Set appNickname" onChangeHandler={onChangeAppNickname} />
        <Button
          onClick={() => {
            forgeStore.createNickname(appNickname);
          }}
        >
          Create
        </Button>
      </div>
      <Typography variant="h6">Users</Typography>
      <CommonTable data={adminStore.users} deleteFunction={adminStore.deleteUser} idkey={"_id"} />
    </Container>
  );
});

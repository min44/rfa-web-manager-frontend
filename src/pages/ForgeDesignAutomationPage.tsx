import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useStores } from "../hooks/strores.hook";
import { observer } from "mobx-react";
import { CommonTable } from "./forms/CommonTable";
import { BasicTextFields } from "../components/TextField";
import { Button } from "@material-ui/core";

export const ForgeDesignAutomationPage: React.FC = observer(() => {
  const { forgeStore } = useStores();
  const [appBundleName, setAppBundleName] = useState("");
  const [activityName, setActivityName] = useState("");
  const [workItemName, setWorkItemName] = useState("");

  const onChangeAppBundleName = (name: string) => {
    setAppBundleName(name);
  };

  const onChangeActivityName = (name: string) => {
    setActivityName(name);
  };

  const onChangeWorkItemName = (name: string) => {
    setWorkItemName(name);
  };

  return (
    <Container style={{marginBottom: "50px"}}>
      <CssBaseline />
      <div style={{ width: "100%", textAlign: "right" }}>
        <Typography variant="h5" gutterBottom style={{ float: "left" }}>
          Application Nickname: {forgeStore.forgeAppName}
        </Typography>
        <Typography variant="h5" gutterBottom>
          State:{" "}
          {forgeStore.appBundlesState.state === "fulfilled"
            ? "Loading complete"
            : forgeStore.appBundlesState.state}
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <BasicTextFields
          name="Create appbundle"
          onChangeHandler={onChangeAppBundleName}
        />
        <Button
          onClick={() => {
            forgeStore.createAppBundle(appBundleName);
          }}
        >
          Create
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <BasicTextFields
          name="Create activity"
          onChangeHandler={onChangeActivityName}
        />
        <Button
          onClick={() => {
            forgeStore.createActivity(activityName);
          }}
        >
          Create
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <BasicTextFields
          name="Create workitem"
          onChangeHandler={onChangeWorkItemName}
        />
        <Button
          onClick={() => {
            forgeStore.createWorkItem(workItemName);
          }}
        >
          Create
        </Button>
      </div>
      <Typography variant="h5">AppBundles</Typography>
      <CommonTable data={forgeStore.appBundles} deleteFunction={forgeStore.deleteAppBundle} idkey={"id"} />
      <Typography variant="h5">Activities</Typography>
      <CommonTable data={forgeStore.activities} deleteFunction={forgeStore.deleteActivity} idkey={"id"} />
    </Container>
  );
});

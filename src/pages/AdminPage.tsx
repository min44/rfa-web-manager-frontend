import React, { useState } from "react";
import { observer } from "mobx-react";
import { Typography, Container, CssBaseline } from "@material-ui/core";
import { useStores } from "../hooks/strores.hook";
import { CommonTable } from "./forms/CommonTable";
import { BasicTextFields } from "../components/TextField";
import { CommonTableCollapsible } from "./forms/CommonTableCollapsible";

export const AdministratorPage: React.FC = observer(() => {
  const { adminStore, forgeStore } = useStores();
  const [appBundleName, setAppBundleName] = useState("");
  const [activityName, setActivityName] = useState("");

  const onChangeAppBundleName = (name: string) => {
    setAppBundleName(name);
  };

  const onChangeActivityName = (name: string) => {
    setActivityName(name);
  };

  const onSubmitCreateAppBundle = () => {
    forgeStore.createAppBundle(appBundleName);
  };

  const onSubmitCreateActivity = () => {
    forgeStore.createActivity(activityName);
  };

  return (
    <Container>
      <CssBaseline />
      <div style={{ width: "100%", textAlign: "right" }}>
        <Typography variant="body2" gutterBottom style={{ float: "left" }}>
          application nickname: {forgeStore.forgeAppName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {forgeStore.appBundlesState.state === "fulfilled"
            ? "Loading complete"
            : forgeStore.appBundlesState.state}
        </Typography>
      </div>
      <CommonTableCollapsible
        mainData={forgeStore.buckets}
        mainDelete={forgeStore.deleteBucket}
        mainId={"bucketKey"}
        secondData={forgeStore.allObjects}
        secondDelete={forgeStore.deleteObject}
        secondId={"objectKey"}
        secondFilter={["objectId", "sha1", "location"]}
      />
      <Typography variant="h5">Users</Typography>
      <CommonTable
        data={adminStore.users}
        deleteFunction={adminStore.deleteUser}
        idkey={"_id"}
        filter={["password", "__v"]}
      />
      <Typography variant="h5">Buckets</Typography>
      <CommonTable data={forgeStore.buckets} deleteFunction={forgeStore.deleteBucket} idkey={"bucketKey"} />
      <Typography variant="h5">Objects</Typography>
      <CommonTable data={forgeStore.objects} deleteFunction={forgeStore.deleteObject} idkey={"objectKey"} second filter={["objectId", "sha1", "location"]}/>
      <Typography variant="h5">AppBundles</Typography>
      <BasicTextFields
        name="Create appbundle"
        onChangeHandler={onChangeAppBundleName}
        onSubmitEventHandler={onSubmitCreateAppBundle}
      />
      <CommonTable data={forgeStore.appBundles} deleteFunction={forgeStore.deleteAppBundle} idkey={"id"} />
      <Typography variant="h5">Activities</Typography>
      <BasicTextFields
        name="Create activity"
        onChangeHandler={onChangeActivityName}
        onSubmitEventHandler={onSubmitCreateActivity}
      />
      <CommonTable data={forgeStore.activities} deleteFunction={forgeStore.deleteActivity} idkey={"id"} />
    </Container>
  );
});

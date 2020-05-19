import React, { useState } from "react";
import { observer } from "mobx-react";
import { Typography, Container, CssBaseline } from "@material-ui/core";
import { useStores } from "../hooks/strores.hook";
import { CommonTable } from "./forms/CommonTable";
import { BasicTextFields } from "../components/TextField";
import { CommonTableCollapsible } from "./forms/CommonTableCollapsible";

export const AdministratorPage: React.FC = observer(() => {
  const { adminStore } = useStores();
  const [appBundleName, setAppBundleName] = useState("");
  const [activityName, setActivityName] = useState("");

  const onChangeAppBundleName = (name: string) => {
    setAppBundleName(name);
  };

  const onChangeActivityName = (name: string) => {
    setActivityName(name);
  };

  const onSubmitCreateAppBundle = () => {
    adminStore.createAppBundle(appBundleName);
  };

  const onSubmitCreateActivity = () => {
    adminStore.createActivity(activityName);
  };

  return (
    <Container>
      <CssBaseline />
      <div style={{ width: "100%", textAlign: "right" }}>
        <Typography variant="body2" gutterBottom style={{ float: "left" }}>
          application nickname: {adminStore.forgeAppName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {adminStore.appBundlesState.state === "fulfilled"
            ? "Loading complete"
            : adminStore.appBundlesState.state}
        </Typography>
      </div>
      <CommonTableCollapsible
        mainData={adminStore.buckets}
        mainDelete={adminStore.deleteBucket}
        mainId={"bucketKey"}
        secondData={adminStore.allObjects}
        secondDelete={adminStore.deleteObject}
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
      <Typography variant="h5">AppBundles</Typography>
      <BasicTextFields
        name="Create appbundle"
        onChangeHandler={onChangeAppBundleName}
        onSubmitEventHandler={onSubmitCreateAppBundle}
      />
      <CommonTable data={adminStore.appBundles} deleteFunction={adminStore.deleteAppBundle} idkey={"id"} />
      <Typography variant="h5">Activities</Typography>
      <BasicTextFields
        name="Create activity"
        onChangeHandler={onChangeActivityName}
        onSubmitEventHandler={onSubmitCreateActivity}
      />
      <CommonTable data={adminStore.activities} deleteFunction={adminStore.deleteActivity} idkey={"id"} />
    </Container>
  );
});

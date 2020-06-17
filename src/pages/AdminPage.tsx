import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Typography, Container, CssBaseline, Box } from "@material-ui/core";
import { useStores } from "../hooks/strores.hook";
import { CommonTable } from "./forms/CommonTable";
import { BasicTextFields } from "../components/TextField";
import { ComboBox } from "../components/ComboBox";
import { CommonTableCollapsible } from "./forms/CommonTableCollapsible";

export const AdministratorPage: React.FC = observer(() => {
  const { adminStore } = useStores();
  const [appBundleName, setAppBundleName] = useState<string>("");
  const [activityName, setActivityName] = useState<string>("");
  const [userSetRoleForm, setUserSetRoleForm] = useState<{ id: string; role: string }>({ id: "", role: "" });

  useEffect(() => {
    console.log(userSetRoleForm);
  }, [userSetRoleForm]);

  const onChangeAppBundleName = (name: string) => {
    setAppBundleName(name);
  };

  const onChangeActivityName = (name: string) => {
    setActivityName(name);
  };

  const onChangeComboBoxHandler = (id: string) => {
    setUserSetRoleForm({ ...userSetRoleForm, id });
  };

  const onChangeBasicTextFieldHandler = (role: string) => {
    setUserSetRoleForm({ ...userSetRoleForm, role });
  };

  const onSubmitCreateAppBundle = () => {
    adminStore.createAppBundle(appBundleName);
  };

  const onSubmitCreateActivity = () => {
    adminStore.createActivity(activityName);
  };

  const onSubmitSetUserRole = () => {
    adminStore.setUserRole(userSetRoleForm.id, userSetRoleForm.role);
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
      <Typography variant="h5">Common storage</Typography>
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
      <Typography variant="h6">Change user role</Typography>
      <Box style={{ display: "flex" }}>
        <ComboBox onChange={onChangeComboBoxHandler} data={adminStore.users} />
        <BasicTextFields
          name="Enter new status of user"
          onChangeHandler={onChangeBasicTextFieldHandler}
          onSubmitEventHandler={onSubmitSetUserRole}
        />
      </Box>
      <CommonTable
        data={adminStore.users}
        deleteFunction={adminStore.deleteUser}
        idkey={"_id"}
        filter={["password", "__v"]}
        state={adminStore.usersState.state}
      />
      <Typography variant="h5">AppBundles</Typography>
      <BasicTextFields
        name="Create appbundle"
        onChangeHandler={onChangeAppBundleName}
        onSubmitEventHandler={onSubmitCreateAppBundle}
      />
      <CommonTable
        data={adminStore.appBundles}
        deleteFunction={adminStore.deleteAppBundle}
        idkey={"id"}
        state={adminStore.appBundlesState.state}
      />
      <Typography variant="h5">Activities</Typography>
      <BasicTextFields
        name="Create activity"
        onChangeHandler={onChangeActivityName}
        onSubmitEventHandler={onSubmitCreateActivity}
      />
      <CommonTable
        data={adminStore.activities}
        deleteFunction={adminStore.deleteActivity}
        idkey={"id"}
        state={adminStore.activitiesState.state}
      />
    </Container>
  );
});

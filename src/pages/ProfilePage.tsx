import React from "react";
import { observer } from "mobx-react";
import { Container, Typography } from "@material-ui/core";
import { useStores } from "../hooks/strores.hook";

export const ProfilePage: React.FC = observer(() => {
  const { userStore } = useStores();
  const { currentUser } = userStore;

  return (
    <Container>
      <Typography variant="h4">
        Profile
      </Typography>
      <div>ID: { currentUser?.id }</div>
      <div>EMAIL: { currentUser?.email }</div>
      {/* <div>NICKNAME: { currentUser?.display_name }</div>
      <div>FULLNAME: { currentUser?.full_name }</div> */}
      {/* <div>CREATED: { currentUser?.created_at }</div>
      <div>DELETED: { currentUser?.deleted_at }</div>
      <div>LAST ACTIVITY: { currentUser?.last_activity_at }</div>
      <div>LANGUAGE: { currentUser?.language }</div> */}
    </Container>
  );
});

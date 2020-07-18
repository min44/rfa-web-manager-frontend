import React from "react";
import { observer } from "mobx-react";
import { Container, Typography } from "@material-ui/core";
import { useStores } from "../hooks/stores.hook";

export const ProfilePage: React.FC = observer(() => {
  const { userStore } = useStores();
  const { currentUser } = userStore;

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      {currentUser &&
        Object.entries(currentUser).map((entry) => (
          <Typography>
            {entry[0]}: {entry[1]}
          </Typography>
        ))}
    </Container>
  );
});

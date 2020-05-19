import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <List>
    <ListItem button component={NavLink} to="/upload">
      <ListItemText primary="Upload" />
    </ListItem>
    <ListItem button component={NavLink} to="/storage">
      <ListItemText primary="Storage" />
    </ListItem>
    <ListItem button component={NavLink} to="/parametermanagement">
      <ListItemText primary="ParameterManagement" />
    </ListItem>
  </List>
);

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
    <ListItem button component={NavLink} to="/datamanagement">
      <ListItemText primary="DataManagement" />
    </ListItem>
    <ListItem button component={NavLink} to="/designautomation">
      <ListItemText primary="DesignAutomation" />
    </ListItem>
    <ListItem button component={NavLink} to="/parametermanagement">
      <ListItemText primary="ParameterManagement" />
    </ListItem>
  </List>
);

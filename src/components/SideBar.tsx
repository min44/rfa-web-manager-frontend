import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CloudUpload from "@material-ui/icons/CloudUpload";
import SecurityIcon from "@material-ui/icons/Security";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <List>
    <ListItem button component={NavLink} to="/upload">
      <ListItemIcon>
        <CloudUpload />
      </ListItemIcon>
      <ListItemText primary="Upload" />
    </ListItem>
    <ListItem button component={NavLink} to="/application">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Application" />
    </ListItem>
    <ListItem button component={NavLink} to="/admin">
      <ListItemIcon>
        <SecurityIcon />
      </ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>
  </List>
);

export const secondaryListItems = (
  <List>
    <ListSubheader inset>Recent</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Family one" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Family two" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Family three" />
    </ListItem>
  </List>
);

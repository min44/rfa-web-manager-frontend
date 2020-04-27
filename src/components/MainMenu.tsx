import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import CloudUpload from "@material-ui/icons/CloudUpload";
import MenuItemIcon from "@material-ui/core/ListItemIcon";

export const MainMenu = (props: any) => {
  const { open, handleClose, anchorEl } = props;

  return (
    <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
      <MenuItem button component={NavLink} to="/upload">
        Upload
      </MenuItem>
      <MenuItem>Sometext2</MenuItem>
    </Menu>
  );
};

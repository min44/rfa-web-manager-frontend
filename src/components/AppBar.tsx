import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Toolbar, IconButton, Drawer, Divider } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Title } from "../components/Title";
import { mainListItems } from "../components/SideBar";
import ProfileMenu from "../components/DashboardAppBar/ProfileMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 30,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export const ButtonAppBar = () => {
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleClose = () => {
    setAnchor(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor={"left"} open={open} onClose={handleClose}>
            {mainListItems}
            <Divider />
          </Drawer>
          <Title />
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

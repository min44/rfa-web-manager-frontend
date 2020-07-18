import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";
import ProfileMenu from "./ProfileMenu";
import { useStores } from "../../hooks/stores.hook";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontWeight: 1,
  },
}));

interface IDashboardAppBarProps {
  handleDrawerOpen: () => void;
  drawerIsOpened: boolean;  
}

const DashboardAppBar: React.FC<IDashboardAppBarProps> = ({
  handleDrawerOpen,
  drawerIsOpened,
}: IDashboardAppBarProps) => {
  const { userStore } = useStores();
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={clsx(classes.appBar, drawerIsOpened && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className={clsx(classes.menuButton, drawerIsOpened && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h5" color="inherit" className={classes.title} noWrap>
          {window.location.pathname.split("/").toString().charAt(1).toUpperCase() +
            window.location.pathname.split("/").toString().slice(2) +
            " page"}
        </Typography>
        <div>{userStore.currentUser?.email}</div>
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppBar;

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Security from "@material-ui/icons/Security";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";
import { useStores } from "../../hooks/strores.hook";

interface IProfileMenuProps extends RouteComponentProps {}

const ProfileMenu: React.FC<IProfileMenuProps> = ({ history }: IProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { authStore, userStore } = useStores();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    history.replace("/profile");
  };

  const handleLogoutClick = (event: any) => {
    event.preventDefault();
    authStore.logOut();
    history.replace("/auth/login");
    handleClose();
  };

  return (
    <div>
      {userStore.isAdmin ? (
        <IconButton color="inherit" component={NavLink} to="/admin">
          <Security />
        </IconButton>
      ) : (
        <div />
      )}

      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick} component={NavLink} to="/">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(ProfileMenu);

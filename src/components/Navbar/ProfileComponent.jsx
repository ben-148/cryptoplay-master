import { AccountCircle } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import React, { Fragment, useState } from "react";
import NavLinkComponent from "./NavLinkComponent";

const ProfileComponent = ({ profilePages, logoutClickProp }) => {
  const [isProfilePic, setIsProfilePic] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profilePicAlt, setProfilePicAlt] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const logoutClick = () => {
    logoutClickProp();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const avatarPages = [...profilePages];
  return (
    <Fragment>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {isProfilePic ? (
          <Avatar alt={profilePicAlt} src={profilePic} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {avatarPages.map((page) => (
          <MenuItem
            key={"miniLinks" + page.url}
            onClick={handleClose}
            sx={{ padding: "8px", minWidth: "100px" }}
          >
            {page.label === "Logout" ? (
              <NavLinkComponent
                key={page.url}
                {...page}
                onClick={logoutClick}
              />
            ) : (
              <NavLinkComponent key={"miniLinks2" + page.url} {...page} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default ProfileComponent;

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ContrastIcon from "@mui/icons-material/Contrast";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

export default function AccountMenu() {
  const userState = useSelector((store) => store.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {userState.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar>{userState.name.charAt(0).toUpperCase()}</Avatar>{" "}
          <div>
            <p
              style={{
                lineHeight: 0.2,
                fontSize: 15,
                fontWeight: "bold",
                color: "#242424",
              }}
            >
              {userState.name}
            </p>
            <p style={{ lineHeight: 0.2, fontSize: 15, color: "#808080" }}>
              {userState.email}
            </p>
          </div>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{ backgroundColor: "#f5f5f5", color: "#969696" }}
        >
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ color: "#000000" }}
          onClick={() => {
            handleClose();
            window.location.href = "/admin/user-managment";
          }}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Manage accounts
        </MenuItem>
        <MenuItem style={{ backgroundColor: "#f5f5f5", color: "#969696" }}>
          <ListItemIcon style={{ color: "#969696" }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          Page settings
        </MenuItem>
        <MenuItem
          style={{ color: "#000000" }}
          onClick={() => {
            handleClose();
            window.location.href = "/admin/personalization";
          }}
        >
          <ListItemIcon>
            <ContrastIcon fontSize="small" />
          </ListItemIcon>
          Page theme
        </MenuItem>
        <MenuItem
          style={{ color: "#000000" }}
          onClick={() => {
            handleClose();
            logout();
            window.location.href = "/login";
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

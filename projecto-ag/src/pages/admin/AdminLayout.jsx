import PropTypes from "prop-types";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Avatar,
  Typography,
} from "@mui/material";

const drawerWidth = 105;

import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  Settings,
  SpaceDashboard,
  Videocam,
  VideocamOutlined,
  ViewCarouselOutlined,
} from "@mui/icons-material";
import AccountMenu from "./AccountMenu";

const Root = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 10px;
  background-color: #ffffff;
  width: calc(100% - ${drawerWidth}px);
  height: 98.7vh;
`;

const AdminLayout = (props) => {
  return (
    <Root style={{ backgroundColor: "#e9e9e9", padding: 5 }}>
      <div
        variant="permanent"
        style={{ backgroundColor: "transparent", width: 230 }}
      >
        <Toolbar style={{ padding: 0, marginBottom: 30 }}>
          <Button
            href="https://almendragala.com"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignContent: "center",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <h3 style={{ color: "#000000", textTransform: "capitalize" }}>
              Almendragala
            </h3>
            <p
              style={{
                color: "#818181",
                textTransform: "lowercase",
                marginBottom: 8,
              }}
            >
              v1
            </p>
          </Button>
        </Toolbar>
        <List>
          <p
            style={{
              fontSize: 11,
              fontWeight: "500",
              textAlign: "start",
              marginLeft: 19,
              color: "#333",
              lineHeight: 0,
            }}
          >
            GENERAL
          </p>
          <ListItemButton component={Link} to="/admin/content">
            <VideocamOutlined sx={{ width: 27, height: 27, marginRight: 1 }}>
              {" "}
            </VideocamOutlined>
            <ListItemText primary="Content" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/template">
            <DashboardOutlined
              sx={{ width: 27, height: 27, marginRight: 1 }}
            ></DashboardOutlined>
            <ListItemText primary="Template" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/carousels">
            <ViewCarouselOutlined
              sx={{ width: 27, height: 27, marginRight: 1 }}
            ></ViewCarouselOutlined>
            <ListItemText primary="Carousels" />
          </ListItemButton>
        </List>
      </div>
      <Content
        style={{
          borderRadius: 18,
        }}
      >
        <Toolbar
          style={{
            marginLeft: "auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AccountMenu />
        </Toolbar>
        <div> {props.children}</div>
      </Content>
    </Root>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;

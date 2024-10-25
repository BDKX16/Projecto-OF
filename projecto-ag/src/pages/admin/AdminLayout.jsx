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
  AccountBalanceRounded,
  AutoAwesomeMotion,
  CreditCard,
  CreditCardSharp,
  CreditScoreRounded,
  DashboardOutlined,
  NotificationsRounded,
  Settings,
  SpaceDashboard,
  Videocam,
  VideocamOutlined,
  ViewCarouselOutlined,
  ViewDayTwoTone,
  WebAssetTwoTone,
} from "@mui/icons-material";
import AccountMenu from "./AccountMenu";
import NotificationsMenu from "./NotificationsMenu";

import { useSelector } from "react-redux";
const Root = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`;

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#e9e9e9",
    },
  },
});

const Content = styled.div`
  flex-grow: 1;
  padding: 10px;
  background-color: #ffffff;
  width: calc(100% - ${drawerWidth}px);
  min-height: 98.7vh;
`;

const AdminLayout = (props) => {
  const userState = useSelector((store) => store.user);
  return (
    <ThemeProvider theme={theme}>
      <Root style={{ backgroundColor: "#e9e9e9", padding: 5 }}>
        <div
          variant="permanent"
          style={{ backgroundColor: "transparent", width: 230 }}
        >
          <Toolbar style={{ padding: 0, marginBottom: 30 }}>
            <Link
              to="/admin"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                  marginBottom: 14,
                }}
              >
                v1
              </p>
            </Link>
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
              />
              <ListItemText primary="Carousels" />
            </ListItemButton>
            <ListItemButton component={Link} to="/admin/category">
              <AutoAwesomeMotion
                sx={{ width: 27, height: 27, marginRight: 1 }}
              />
              <ListItemText primary="Categorys" />
            </ListItemButton>
            <ListItemButton disabled component={Link} to="/admin/category">
              <WebAssetTwoTone sx={{ width: 27, height: 27, marginRight: 1 }} />

              <ListItemText primary="Navbar" />
            </ListItemButton>
            <ListItemButton disabled component={Link} to="/admin/category">
              <WebAssetTwoTone
                sx={{
                  width: 27,
                  height: 27,
                  marginRight: 1,
                  transform: "rotate(180deg)",
                }}
              />
              <ListItemText primary="Footer" />
            </ListItemButton>

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
              BILLING
            </p>
            <ListItemButton component={Link} to="/admin/payments">
              <CreditScoreRounded
                sx={{ width: 27, height: 27, marginRight: 1 }}
              ></CreditScoreRounded>
              <ListItemText primary="Payments" />
            </ListItemButton>
            <ListItemButton component={Link} disabled to="/admin/payments">
              <AccountBalanceRounded
                sx={{ width: 27, height: 27, marginRight: 1 }}
              ></AccountBalanceRounded>
              <ListItemText primary="Payment Methods" />
            </ListItemButton>
          </List>
        </div>
        <Content
          style={{
            borderRadius: 18,
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Toolbar
            style={{
              marginLeft: "auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <NotificationsMenu />
            <AccountMenu />
          </Toolbar>
          <div style={{ padding: 30 }}> {props.children}</div>
        </Content>
      </Root>
    </ThemeProvider>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;

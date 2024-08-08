import PropTypes from "prop-types";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const drawerWidth = 105;

import styled from "styled-components";
import { Link } from "react-router-dom";

const Root = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`;

const DrawerPaper = styled.div`
  width: ${drawerWidth}px;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 10px;
  background-color: #2333;
  width: calc(100% - ${drawerWidth}px);
  height: 100vh;
`;

const AdminLayout = (props) => {
  return (
    <Root>
      <StyledDrawer
        variant="permanent"
        classes={{
          paper: DrawerPaper,
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton component={Link} to="/admin/content">
            <ListItemText primary="Content" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/template">
            <ListItemText primary="Template" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/carousels">
            <ListItemText primary="Carousels" />
          </ListItemButton>
        </List>
      </StyledDrawer>
      <Content>
        <Toolbar />
        <div> {props.children}</div>
      </Content>
    </Root>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;

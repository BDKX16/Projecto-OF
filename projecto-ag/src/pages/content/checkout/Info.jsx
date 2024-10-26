import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function Info({ totalPrice, contenido }) {
  const calculateTotal = (products) => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price;
    }
    return total;
  };
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        ${totalPrice}
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            sx={{ mr: 2 }}
            primary={
              contenido.title && contenido.title.length > 40
                ? `${contenido.title.substring(0, 30)}...`
                : contenido.title
            }
            secondary={
              contenido.description.length > 40
                ? `${contenido.description.substring(0, 40)}...`
                : contenido.description
            }
          />
          <Typography variant="body1" fontWeight="medium" noWrap={true}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;

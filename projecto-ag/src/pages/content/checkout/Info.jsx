import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const products = [
  {
    name: "Professional plan",
    desc: "Monthly subscription",
    price: "$15.00",
  },
  {
    name: "Dedicated support",
    desc: "Included in the Professional plan",
    price: "Free",
  },
  {
    name: "Hardware",
    desc: "Devices needed for development",
    price: "$69.99",
  },
  {
    name: "Landing page template",
    desc: "License",
    price: "$49.99",
  },
];

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
        {calculateTotal(contenido) == 0
          ? "GRATIS"
          : "$ " + calculateTotal(contenido)}
      </Typography>
      <List disablePadding>
        {contenido.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={
                product.title.length > 40
                  ? `${product.title.substring(0, 30)}...`
                  : product.title
              }
              secondary={
                product.description.length > 40
                  ? `${product.description.substring(0, 40)}...`
                  : product.description
              }
            />
            <Typography variant="body1" fontWeight="medium">
              {product.price == 0 ? "GRATIS" : "$ " + product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;

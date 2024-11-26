import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const convertToUsd = (price) => {
  const usdPrice = price / 1250;
  return usdPrice.toFixed(2) + " USD";
};

const convertToPaypalFee = (price) => {
  const usdPrice = (price / 1250) * 0.04;
  return usdPrice.toFixed(2) + " USD";
};

const convertToUsdTotal = (price) => {
  const usdPrice = (price / 1250) * 1.04;
  return usdPrice.toFixed(2) + " USD";
};

export default function Review({ price, formData, paymentData }) {
  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary="1 Selected" />
          <Typography variant="body2">
            ${paymentData == "paypal" ? convertToUsd(price) : price}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Paypal" secondary="fee" />
          <Typography variant="body2">
            ${paymentData == "paypal" ? convertToPaypalFee(price) : price}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${paymentData == "paypal" ? convertToUsdTotal(price) : price}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Datos de facturacion
          </Typography>
          <Typography gutterBottom>
            {capitalize(formData.firstName) +
              " " +
              capitalize(formData.lastName)}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {capitalize(formData.address) +
              ", " +
              capitalize(formData.city) +
              ", " +
              capitalize(formData.state) +
              ", " +
              formData.postalCode +
              ", " +
              capitalize(formData.country.label)}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Metodo de pago
          </Typography>
          <Grid container>
            <Stack
              direction="column"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" color="text.secondary">
                {capitalize(paymentData)}
              </Typography>
            </Stack>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}

import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PaymentForm({ onPaymentTypeChange }) {
  const [paymentType, setPaymentType] = React.useState("");

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
    onPaymentTypeChange(value);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          sx={{
            flexDirection: { sm: "column", md: "row" },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === "mercadopago"}
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
              outlineColor:
                paymentType === "mercadopago" ? "primary.main" : "divider",
              backgroundColor:
                paymentType === "mercadopago" ? "background.default" : "",
            }}
          >
            <CardActionArea
              onClick={() => handlePaymentTypeChange("mercadopago")}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Mercadopago</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === "paypal"}
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
              outlineColor:
                paymentType === "paypal" ? "primary.main" : "divider",
              backgroundColor:
                paymentType === "paypal" ? "background.default" : "",
            }}
          >
            <CardActionArea onClick={() => handlePaymentTypeChange("paypal")}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Paypal</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === "bankTransfer"}
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
              outlineColor:
                paymentType === "bankTransfer" ? "primary.main" : "divider",
              backgroundColor:
                paymentType === "bankTransfer" ? "background.default" : "",
            }}
          >
            <CardActionArea
              onClick={() => handlePaymentTypeChange("bankTransfer")}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Transferencia</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === "paypal" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Alert severity="info">
            Serás redireccionado para efectuar la compra.
          </Alert>
        </Box>
      )}

      {paymentType === "mercadopago" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Alert severity="info">
            Serás redireccionado para efectuar la compra.
          </Alert>
        </Box>
      )}

      {paymentType === "bankTransfer" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Tu orden sera procesada un vez que recibamos los fondos.
          </Alert>
          <Typography variant="subtitle1" fontWeight="medium">
            Cuenta Bancaria
          </Typography>
          <Typography variant="body1" gutterBottom>
            Por favor transferir el pago a la cuenta bancaria detallada a
            continuacion.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Banco:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              Banco Provincia
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Nro de cuenta:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              42006877745
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              CBU:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              0140323503420068777451
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Alias:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              almendra.gala
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}

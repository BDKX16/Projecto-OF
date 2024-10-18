import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ onFormDataChange }) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
    onFormDataChange(newFormData); // Llama a la función del componente padre
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          Nombre
        </FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="firstName"
          name="firstName"
          type="name"
          placeholder="Juan"
          autoComplete="first name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="lastName" required>
          Apellidos
        </FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="lastName"
          name="lastName"
          type="lastName"
          placeholder="Snow"
          autoComplete="last name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address" required>
          Direccion
        </FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="address"
          name="address"
          type="address"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Direccion 2</FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="address2"
          name="address2"
          type="address2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          Ciudad
        </FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="city"
          name="city"
          type="city"
          placeholder="New York"
          autoComplete="City"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          Provincia
        </FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="state"
          name="state"
          type="state"
          placeholder="NY"
          autoComplete="State"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="postalCode" required>
          Codigo Postal / ZIP
        </FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="postalCode"
          name="postalCode"
          type="postalCode"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Pais
        </FormLabel>
        <OutlinedInput
          onChange={handleChange}
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          required
        />
      </FormGrid>
    </Grid>
  );
}

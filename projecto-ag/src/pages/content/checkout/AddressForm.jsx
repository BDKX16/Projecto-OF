import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const InputContainer = styled("div")({
  position: "relative",
});

const ErrorText = styled(Typography)({
  position: "absolute",
  top: "100%",
  left: 0,
  color: "red",
  fontSize: "12px",
});

const validationSchema = Yup.object({
  firstName: Yup.string().required("El nombre es obligatorio"),
  lastName: Yup.string().required("El apellido es obligatorio"),
  address: Yup.string().required("Una direccion es requerida"),
  phone: Yup.string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,10}$/,
      "El numero de telefono no es válido"
    )
    .required("El numero de telefono es obligatorio"),
  city: Yup.string().required("La ciudad es requerida"),
  state: Yup.string().required("La provincia es requerida"),
  postalCode: Yup.string().required("El codio postal es obligatorio"),
  country: Yup.string().required("El pais es obligatorio"),
});

export default function AddressForm({ onFormDataChange, formData }) {
  const initialValues = JSON.parse(JSON.stringify(formData));
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onFormDataChange(values);
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="firstName" required>
                Nombre
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  fullWidth
                />
                <ErrorMessage
                  name="firstName"
                  component={ErrorText}
                  color="error"
                />
              </InputContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="lastName" required>
                Apellido
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  fullWidth
                />
                <ErrorMessage
                  name="lastName"
                  component={ErrorText}
                  color="error"
                />
              </InputContainer>
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="address" required>
                Dirección
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="address"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  fullWidth
                />
                <ErrorMessage
                  name="address"
                  component={ErrorText}
                  color="error"
                />
              </InputContainer>
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="phone" required>
                Numero de telefono
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  fullWidth
                />
                <ErrorMessage
                  name="phone"
                  component={ErrorText}
                  color="error"
                />
              </InputContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="city" required>
                Ciudad
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="city"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  fullWidth
                />
                <ErrorMessage name="city" component={ErrorText} color="error" />
              </InputContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="state" required>
                Estado
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="state"
                  name="state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  fullWidth
                />
                <ErrorMessage
                  name="state"
                  component={ErrorText}
                  color="error"
                />
              </InputContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="postalCode" required>
                Código Postal
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="postalCode"
                  name="postalCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postalCode}
                  fullWidth
                />
                <ErrorMessage
                  name="postalCode"
                  component={ErrorText}
                  color="error"
                />
              </InputContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="country" required>
                País
              </FormLabel>
              <InputContainer>
                <OutlinedInput
                  id="country"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  fullWidth
                />
                <ErrorMessage
                  name="country"
                  component={ErrorText}
                  color="error"
                />
              </InputContainer>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            endIcon={<ChevronRightRoundedIcon />}
            color="primary"
            style={{ marginTop: "30px" }}
          >
            Siguiente
          </Button>
        </Form>
      )}
    </Formik>
  );
}

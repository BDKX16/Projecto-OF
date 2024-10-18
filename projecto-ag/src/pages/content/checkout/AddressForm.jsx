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

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  address: Yup.string().required("Address is required"),
  address2: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),
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
                First Name
              </FormLabel>
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
                component={Typography}
                color="error"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="lastName" required>
                Last Name
              </FormLabel>
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
                component={Typography}
                color="error"
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="address" required>
                Address
              </FormLabel>
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
                component={Typography}
                color="error"
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="address2">Address 2</FormLabel>
              <OutlinedInput
                id="address2"
                name="address2"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address2}
                fullWidth
              />
              <ErrorMessage
                name="address2"
                component={Typography}
                color="error"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="city" required>
                City
              </FormLabel>
              <OutlinedInput
                id="city"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                fullWidth
              />
              <ErrorMessage name="city" component={Typography} color="error" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="state" required>
                State
              </FormLabel>
              <OutlinedInput
                id="state"
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                fullWidth
              />
              <ErrorMessage name="state" component={Typography} color="error" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="postalCode" required>
                Postal Code
              </FormLabel>
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
                component={Typography}
                color="error"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="country" required>
                Country
              </FormLabel>
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
                component={Typography}
                color="error"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            endIcon={<ChevronRightRoundedIcon />}
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Siguiente
          </Button>
        </Form>
      )}
    </Formik>
  );
}

import React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  //   picture: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  // picture: "",
};

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const register = (values, onSubmitProps) => {
    console.log(values, onSubmitProps);
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = (values, onSubmitProps) => {
    register(values, onSubmitProps);
  };

  return (
    <Box
      sx={{ padding: "0.7rem", backgroundColor: `${palette.background.alt}` }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.7rem",
              }}
            >
              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ width: "100%" }}
              />
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ width: "100%" }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ width: "calc(50% - 0.35rem)" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ width: "calc(50% - 0.35rem)" }}
                />
              </Box>
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ width: "100%" }}
              />
            </Box>

            <Button
              fullWidth
              type="submit"
              sx={{
                cursor: "pointer",
                mt: "0.7rem",
                backgroundColor: `${palette.primary.main}`,
                color: "white",
                height: "2.8rem",
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              Register
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterComponent;

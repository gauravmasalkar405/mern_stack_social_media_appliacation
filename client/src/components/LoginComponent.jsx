import React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  username: "",
  password: "",
};

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const login = (values, onSubmitProps) => {
    console.log(values, onSubmitProps);
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = (values, onSubmitProps) => {
    login(values, onSubmitProps);
  };

  return (
    <Box
      sx={{ padding: "0.7rem", backgroundColor: `${palette.background.alt}` }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
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
              sx={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
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
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginComponent;

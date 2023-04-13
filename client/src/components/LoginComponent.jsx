import React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("required")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot be more than 20 characters"),
  password: yup.lazy((value) =>
    yup
      .string()
      .required("required")
      .notOneOf([yup.ref("username")], "Password cannot contain the username")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password cannot be more than 30 characters")
  ),
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
    let { username, password } = values;
    username = username.trim();
    console.log(username, password);
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

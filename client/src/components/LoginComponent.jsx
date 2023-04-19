import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { loginRoute } from "../routes/userRoutes";
import { setLogin } from "../features/authSlice";

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
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isTabletScreens = useMediaQuery("(max-width: 992px)");

  const login = async (values, onSubmitProps) => {
    let { username, password } = values;
    username = username.trim();

    try {
      const loggedInUser = await axios.post(loginRoute, {
        username,
        password,
      });

      if (loggedInUser.data.status === false) {
        setErrorMsg(loggedInUser.data.msg);
      } else {
        dispatch(
          setLogin({
            user: loggedInUser.data.userFound,
          })
        );

        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }

    setLoader(false);
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = (values, onSubmitProps) => {
    setLoader(true);
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
              {errorMsg && (
                <Typography
                  sx={{ color: "#d32f2f", fontSize: "0.6428571428571428rem" }}
                >
                  {errorMsg}
                </Typography>
              )}
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
              {loader ? (
                <CircularProgress
                  sx={{
                    color: isTabletScreens
                      ? `${palette.primary.main}`
                      : "white",
                  }}
                  size={25}
                />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginComponent;

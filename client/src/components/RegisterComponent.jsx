import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { registerRoute } from "../routes/userRoutes";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

//validation
const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot be more than 20 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password cannot be more than 30 characters"),
  location: yup
    .string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(30, "Location cannot be more than 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "Location can only contain letters and spaces"),
  occupation: yup
    .string()
    .required("Occupation is required")
    .min(2, "Occupation must be at least 2 characters")
    .max(30, "Occupation cannot be more than 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "Occupation can only contain letters and spaces"),
  profilePic: yup.string().required("Profile picture is required"),
});

//initial values
const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  profilePic: "",
};

const RegisterComponent = (props) => {
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const isTabletScreens = useMediaQuery("(max-width: 992px)");

  const { palette } = useTheme();

  const register = async (values, onSubmitProps) => {
    let { username, email, password, location, occupation, profilePic } =
      values;

    username = username.trim();
    email = email.trim();
    location = location.trim();
    occupation = occupation.trim();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("occupation", occupation);
    formData.append("profilePic", profilePic);
    formData.append("profilePicPath", profilePic.name);

    try {
      const response = await axios.post(registerRoute, formData);
      if (response.data.status === false) {
        setErrorMsg(response.data.msg);
      } else {
        props.navigateToLoginPage();
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoader(false);
      onSubmitProps.resetForm();
    }
  };

  const handleFormSubmit = (values, onSubmitProps) => {
    setLoader(true);
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
              <Box
                border={`1px solid ${palette.neutral.medium}`}
                sx={{
                  borderRadius: "5px",
                  p: "0.5rem",
                }}
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("profilePic", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      borderRadius="5px"
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <Input {...getInputProps()} />
                      {!values.profilePic ? (
                        <p>Add picture here</p>
                      ) : (
                        <Box sx={{ display: "flex", gap: "0.7rem" }}>
                          <Typography>{values.profilePic.name}</Typography>
                          <EditOutlinedIcon />
                        </Box>
                      )}
                    </Box>
                  )}
                </Dropzone>
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
                color: `${palette.background.alt}`,
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
                "Register"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterComponent;

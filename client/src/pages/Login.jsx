import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

const Login = () => {
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const theme = useTheme();
  const isTabletScreens = useMediaQuery("(max-width: 992px)");
  const isMobileScreens = useMediaQuery("(max-width: 480px)");

  //navigate to login page when register successfully
  const navigateToLoginPage = () => {
    setIsRegisterPage(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: `${theme.palette.background.alt}`,
          height: "60px",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "32px",
            color: `${theme.palette.primary.main}`,
            margin: "auto",
          }}
        >
          SocialCircle
        </Typography>
      </Box>
      <Box
        width={isMobileScreens ? "85vw" : isTabletScreens ? "65vw" : "40vw"}
        sx={{
          height: "4rem",
          padding: "0rem 0.7rem",
          borderRadius: "10px",
          display: "flex",
          textAlign: "center",
          backgroundColor: `${theme.palette.background.alt}`,
        }}
      >
        <Typography
          sx={{
            margin: "auto",
            fontWeight: "500",
          }}
        >
          Welcome to SocialCircle. The social media app for gen z!
        </Typography>
      </Box>
      <Box width={isMobileScreens ? "85vw" : isTabletScreens ? "65vw" : "40vw"}>
        {isRegisterPage ? (
          <RegisterComponent navigateToLoginPage={navigateToLoginPage} />
        ) : (
          <LoginComponent />
        )}
      </Box>
      <Box
        width={isMobileScreens ? "85vw" : isTabletScreens ? "65vw" : "40vw"}
        sx={{
          backgroundColor: `${theme.palette.background.alt}`,
          p: "0.5rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        {isRegisterPage ? (
          <Typography>
            Already have an account?{" "}
            <Typography
              variant="span"
              onClick={() => setIsRegisterPage(false)}
              sx={{ color: `${theme.palette.primary.main}`, cursor: "pointer" }}
            >
              Login here
            </Typography>
          </Typography>
        ) : (
          <Typography>
            Dont't have an account?{" "}
            <Typography
              variant="span"
              onClick={() => setIsRegisterPage(true)}
              sx={{ color: `${theme.palette.primary.main}`, cursor: "pointer" }}
            >
              Register here
            </Typography>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;

import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FriendListWidget from "../components/widgets/FriendListWidget";
import MakePostWidget from "../components/widgets/MakePostWidget";
import AllPostWidget from "../components/widgets/AllPostsWidget";
import UserWidget from "../components/widgets/UserWidget";
import { getUser } from "../routes/userRoutes";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isDesktopScreens = useMediaQuery("(min-width:992px)");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const getUserData = async () => {
    try {
      const response = await axios.post(`${getUser}/${userId}`);
      if (response.data.status) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
      // You can log the error here
      console.log(error, errorInfo);
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        // You can render a fallback UI here
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }

  return (
    user && (
      <Box>
        <Navbar user={loggedInUser} />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isDesktopScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isDesktopScreens ? "26%" : undefined}>
            <UserWidget user={user} />
            <Box m="2rem 0" />

            <ErrorBoundary>
              <FriendListWidget userId={userId} />
            </ErrorBoundary>
          </Box>
          <Box
            flexBasis={isDesktopScreens ? "42%" : undefined}
            mt={isDesktopScreens ? undefined : "2rem"}
          >
            <MakePostWidget user={user} />
            <Box m="2rem 0" />

            <ErrorBoundary>
              <AllPostWidget user={user} isProfile />
            </ErrorBoundary>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default Profile;

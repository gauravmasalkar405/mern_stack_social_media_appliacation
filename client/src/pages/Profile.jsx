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

  return (
    user && (
      <Box>
        <Navbar />

        <Box
          sx={{
            display: !isDesktopScreens ? "block" : "flex",
            width: "100%",
            padding: "2rem",
            gap: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: !isDesktopScreens ? "auto" : "23%",
              mb: "1rem",
            }}
          >
            <UserWidget user={user} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: !isDesktopScreens ? "auto" : "49%",
              mb: "1rem",
            }}
          >
            <MakePostWidget user={user} />
            {!isDesktopScreens && (
              <Box
                sx={{
                  width: !isDesktopScreens ? "auto" : "23%",
                  mt: "1rem",
                }}
              >
                <FriendListWidget userId={userId} />
              </Box>
            )}

            <AllPostWidget user={user} isProfile />
          </Box>
          {isDesktopScreens && (
            <Box
              sx={{
                width: !isDesktopScreens ? "auto" : "23%",
                mb: "1rem",
              }}
            >
              <FriendListWidget userId={userId} />
            </Box>
          )}
        </Box>
      </Box>
    )
  );
};

export default Profile;

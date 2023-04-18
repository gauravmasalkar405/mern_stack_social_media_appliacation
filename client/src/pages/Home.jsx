import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import UserWidget from "../components/widgets/UserWidget";
import { useSelector } from "react-redux";
import { UseMediaQuery } from "@mui/material";
import MakePostWidget from "../components/widgets/MakePostWidget";
import AdvertWidget from "../components/widgets/AdvertWidget";
import AllPostsWidget from "../components/widgets/AllPostsWidget";
import { Directions } from "@mui/icons-material";
import FriendListWidget from "../components/widgets/FriendListWidget";

const Home = () => {
  const isTabletScreens = useMediaQuery("(max-width: 992px)");
  const user = useSelector((state) => state.auth.user);
  return (
    <Box>
      <Navbar user={user} />
      <Box
        sx={{
          display: isTabletScreens ? "block" : "flex",
          width: "100%",
          padding: "2rem",
          gap: "0.5rem",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: isTabletScreens ? "auto" : "23%",
            mb: "1rem",
          }}
        >
          <UserWidget user={user} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isTabletScreens ? "auto" : "49%",
            mb: "1rem",
          }}
        >
          <MakePostWidget user={user} />
          <AllPostsWidget user={user} />
        </Box>
        <Box
          sx={{
            width: isTabletScreens ? "auto" : "23%",
            mb: "1rem",
          }}
        >
          {!isTabletScreens && <FriendListWidget userId={user._id} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

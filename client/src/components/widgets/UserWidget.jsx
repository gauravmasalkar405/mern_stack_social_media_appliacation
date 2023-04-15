import React, { useState, useEffect } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import UserImage from "../../styles/UserImage";
import WidgetWrapper from "../../styles/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";

const UserWidget = ({ user }) => {
  const {
    username,
    profilePic,
    occupation,
    location,
    friends,
    _id,
    viewedProfile,
    impressions,
  } = user;
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          pb: "1.1rem",
        }}
        onClick={() => navigate(`/profile/${_id}`)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <UserImage image={profilePic} />
          <Box>
            <Typography
              fontSize="1rem"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {username}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </Box>
        <ManageAccountsOutlined />
      </Box>
      <Divider />

      <Box p="1rem 0">
        <Box
          sx={{
            mb: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "0.5rem",
          }}
        >
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </Box>
        <Box
          sx={{
            mb: "0.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </Box>
      </Box>
      <Divider />

      <Box sx={{ p: "1rem 0" }}>
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            mb: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img src={twitter} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </Box>
          <EditOutlined sx={{ color: main }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            mb: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img src={linkedin} alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </Box>
          <EditOutlined sx={{ color: main }} />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;

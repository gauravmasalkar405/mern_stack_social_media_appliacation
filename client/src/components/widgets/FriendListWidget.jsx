import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../styles/WidgetWrapper";
import Friend from "../Friend";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../features/authSlice";
import { getUserFriends } from "../../routes/userRoutes";
import axios from "axios";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.auth.user.friends);

  const getFriends = async () => {
    try {
      const response = await axios.post(`${getUserFriends}/${userId}`);
      if (response.data.status) {
        dispatch(setFriends({ friends: response.data.formattedFriends }));
        localStorage.setItem(
          "friends",
          JSON.stringify(response.data.formattedFriends)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    friends && (
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Friend List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={friend.username}
              subtitle={friend.occupation}
              userPicturePath={friend.profilePicPath}
            />
          ))}
        </Box>
      </WidgetWrapper>
    )
  );
};

export default FriendListWidget;

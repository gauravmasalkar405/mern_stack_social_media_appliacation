import React, { useEffect, useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  Description,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Friend from "../Friend";
import WidgetWrapper from "../../styles/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../features/authSlice";
import { host } from "../../routes/userRoutes";
import { likePosts } from "../../routes/postRoutes";
import axios from "axios";

const PostWidget = ({
  _id,
  userId,
  username,
  userProfilePic,
  postPicPath,
  location,
  likes,
  description,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  // const loggedInUserId = useSelector((state) => state.auth.user._id);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const loggedInUserId = loggedInUser._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getlikes = async () => {
    try {
      const response = await axios.patch(`${likePosts}/${_id}`, {
        userId: loggedInUserId,
      });
      if (response.data.status) {
        dispatch(setPost({ post: response.data.updatedPost }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={userId}
        name={username}
        subtitle={location}
        userPicturePath={userProfilePic}
      />
      <Typography sx={{ mt: "0.5rem", mb: "0.5rem", color: main }}>
        {description}
      </Typography>
      {postPicPath && (
        <img
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "0.75rem",
          }}
          alt="post"
          src={`${host}/assets/${postPicPath}`}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "0.25rem",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <IconButton onClick={getlikes}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "#ff3040" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Box>
        </Box>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Box>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${username}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

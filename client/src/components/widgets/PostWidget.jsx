import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Friend from "../Friend";
import WidgetWrapper from "../../styles/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../features/authSlice";
import { host } from "../../routes/userRoutes";
import { likePosts, makeComment } from "../../routes/postRoutes";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [userComment, setUserComment] = useState("");
  const [showComments, setShowComments] = useState(comments);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const isDesktopScreens = useMediaQuery("(min-width: 992px)");

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

  // making an comment
  const handleCommentPost = async () => {
    setIsLoader(true);
    try {
      const response = await axios.post(makeComment, {
        loggedUserName: user.username,
        postId: _id,
        commentText: userComment,
      });

      if (response.data.status) {
        // we will store comment in array and map it
        setShowComments(response.data.comments);
      }
      setIsLoader(false);
    } catch (error) {
      console.log(error.message);
    }
    setUserComment("");
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        postId={_id}
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
            <Typography>{showComments.length}</Typography>
          </Box>
        </Box>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Box>
      {isComments && (
        <Box mt="0.5rem">
          {showComments.map((comment, i) => (
            <Box key={`${username}-${i}`}>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <span style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  {`${comment.username} `}
                </span>
                <span>{comment.text}</span>
              </Typography>
            </Box>
          ))}

          {/* comment input */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            <InputBase
              placeholder="Make a comment"
              onChange={(e) => setUserComment(e.target.value)}
              value={userComment}
              sx={{
                backgroundColor: theme.palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.2rem 2rem",
                width: "85%",
              }}
            />
            <Button
              onClick={() => handleCommentPost()}
              sx={{
                color: theme.palette.background.alt,
                backgroundColor: theme.palette.primary.main,
                borderRadius: "3rem",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {isLoader ? (
                <CircularProgress
                  sx={{
                    color: isDesktopScreens
                      ? "white"
                      : `${theme.palette.primary.main}`,
                  }}
                  size={18}
                />
              ) : (
                "POST"
              )}
            </Button>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

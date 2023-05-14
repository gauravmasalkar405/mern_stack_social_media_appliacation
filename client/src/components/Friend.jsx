import React, { useEffect, useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setFriendId, setPosts } from "../features/authSlice";
import UserImage from "../styles/UserImage";
import { addRemoveFreind } from "../routes/userRoutes";
import { deletePost } from "../routes/postRoutes";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Friend = ({ friendId, name, subtitle, userPicturePath, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMoreButtonClicked, setIsMoreButtonClicked] = useState(false);
  const [isUserPost, setIsUserPost] = useState(false);
  const { _id } = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.auth.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  useEffect(() => {
    if (friendId === _id) {
      setIsUserPost(true);
    }
  }, []);

  // req for adding and removing friend
  const addAndRemoveFriend = async () => {
    try {
      const response = await axios.patch(
        `${addRemoveFreind}/${_id}/${friendId}`
      );
      if (response.data.status) {
        dispatch(setFriends({ friends: response.data.formattedFriends }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // more button
  const handleMoreButton = () => {
    setIsMoreButtonClicked(!isMoreButtonClicked);
  };

  const deleteUserPost = async () => {
    try {
      const response = await axios.post(deletePost, { _id: postId });
      console.log(response);
      if (response.data.status) {
        dispatch(setPosts({ posts: response.data.posts }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            dispatch(setFriendId({ friendId: friendId }));
            navigate(`/profile`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {/* if it is userpost then we will not show add friend button but we will show delete post button */}
      {isUserPost ? (
        <Box sx={{ position: "relative" }}>
          <IconButton onClick={handleMoreButton}>
            {isMoreButtonClicked ? (
              <MoreHorizIcon sx={{ color: primaryDark, fontSize: "1.5rem" }} />
            ) : (
              <MoreVertIcon sx={{ color: primaryDark, fontSize: "1.5rem" }} />
            )}
          </IconButton>

          {isMoreButtonClicked && (
            <IconButton
              sx={{
                color: `${medium}`,
                fontSize: "1rem",
                position: "absolute",
                p: "0.3rem 0.5rem",
                borderRadius: "2px",
                top: "45px",
                right: "9px",
                backgroundColor: primaryLight,
              }}
              onClick={() => deleteUserPost()}
            >
              <Typography>Delete</Typography>
            </IconButton>
          )}
        </Box>
      ) : (
        <IconButton
          onClick={() => addAndRemoveFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default Friend;

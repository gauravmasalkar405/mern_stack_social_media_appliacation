import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "../../styles/UserImage";
import WidgetWrapper from "../../styles/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../features/authSlice";

const MakePostWidget = ({ user }) => {
  const { profilePic, _id } = user;
  const [postDescription, setPostDescription] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktopScreens = useMediaQuery("(min-width: 992px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
          width: "100%",
        }}
      >
        <UserImage image={profilePic} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPostDescription(e.target.value)}
          value={postDescription}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </Box>
    </WidgetWrapper>
  );
};

export default MakePostWidget;

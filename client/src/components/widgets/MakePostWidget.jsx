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
import axios from "axios";
import { createPost } from "../../routes/postRoutes";
import CircularProgress from "@mui/material/CircularProgress";

const MakePostWidget = ({ user }) => {
  const { profilePicPath, _id } = user;
  const [postDescription, setPostDescription] = useState("");
  const [isImageIconClicked, setIsImageIconClicked] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktopScreens = useMediaQuery("(min-width: 992px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const handlePost = async () => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", postDescription);
    formData.append("postPic", image);
    formData.append("postPicPath", image.name);

    try {
      const response = await axios.post(createPost, formData);
      if (response.data.status) {
        const posts = response.data.post;
        dispatch(setPosts({ posts }));
      }
      setImage(null);
      setPostDescription("");
      setIsLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

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
        <UserImage image={profilePicPath} />
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

      {isImageIconClicked && (
        <Box
          sx={{
            border: `1px solid ${medium}`,
            borderRadius: "5px",
            mt: "1rem",
            p: "1rem",
          }}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  {...getRootProps()}
                  sx={{
                    border: `1px dashed ${theme.palette.primary.main}`,
                    p: "1rem",
                    width: "100%",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </Box>
                  ) : (
                    <p>Upload image here</p>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "40px" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
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
            gap: "0.25rem",
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.primary.main,
            },
          }}
          onClick={() => setIsImageIconClicked(!isImageIconClicked)}
        >
          <ImageOutlined />
          <Typography>Image</Typography>
        </Box>
        {isDesktopScreens ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachement</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </Box>
        )}
        <Button
          disabled={!postDescription && !image}
          onClick={handlePost}
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
    </WidgetWrapper>
  );
};

export default MakePostWidget;

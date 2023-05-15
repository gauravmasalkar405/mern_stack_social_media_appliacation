import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriendId } from "../features/authSlice";

const SearchQuery = ({ username, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "0.18rem 0rem",
        "&:hover": {
          cursor: "pointer",
          background: "white",
        },
      }}
      onClick={() => {
        dispatch(setFriendId({ friendId: userId }));
        navigate(`/profile`);
      }}
    >
      <Typography sx={{ pl: "1.15rem" }}>{username}</Typography>
    </Box>
  );
};

export default SearchQuery;

import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllUsersRoute } from "../routes/userRoutes";
import SearchQuery from "./SearchQuery";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const isDesktopScreens = useMediaQuery("(min-width: 992px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const username = user.username;

  //getting all users
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(getAllUsersRoute);
        if (response.data.status) {
          const users = response.data.users.map((user) => {
            return { username: user.username, userId: user._id };
          });
          setAllUsers(users);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // suggesting users according to searchQurry
  useEffect(() => {
    const searchUsers = allUsers.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUserSuggestions(searchUsers);
    console.log(userSuggestions);
  }, [searchQuery]);

  return (
    <Box
      sx={{
        padding: "1rem 6%",
        backgroundColor: `${alt}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.75rem",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: `${theme.palette.primary.main}`,
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/home")}
        >
          SocialCircle
        </Typography>
        {isDesktopScreens && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: neutralLight,
              gap: "3rem",
              padding: "0.1rem 1.5rem",
              position: "relative",
            }}
          >
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton>
              <Search />
            </IconButton>

            {/* user on search */}
            {searchQuery.length > 1 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "52px",
                  left: "0",
                  backgroundColor: neutralLight,
                  width: "100%",
                  zIndex: "2",
                  borderRadius: "2px",
                }}
              >
                {userSuggestions &&
                  userSuggestions.map((user) => {
                    return (
                      <Box key={user.userId} sx={{ padding: "0.4rem 0.4rem" }}>
                        <SearchQuery
                          username={user.username}
                          userId={user.userId}
                        />
                      </Box>
                    );
                  })}
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* navbar desktop */}
      {isDesktopScreens ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "1.6rem" }} />
            ) : (
              <LightMode sx={{ color: "dark", fontSize: "1.6rem" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "1.6rem", cursor: "pointer" }} />
          <Notifications sx={{ fontSize: "1.6rem", cursor: "pointer" }} />
          <Help sx={{ fontSize: "1.6rem", cursor: "pointer" }} />
          <FormControl variant="standard" value={username}>
            <Select
              value={username}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={username}>
                <Typography>{username}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* mobile navbar */}
      {!isDesktopScreens && isMobileMenuToggled && (
        <Box
          sx={{
            position: "fixed",
            right: "0",
            top: "0",
            height: "auto",
            zIndex: "10",
            width: "150px",
            backgroundColor: { background },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: "1rem" }}>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* menu items */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2.2rem",
            }}
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "1.6rem", fontSize: "25px" }} />
              ) : (
                <LightMode
                  sx={{ color: "dark", fontSize: "1.6rem", fontSize: "25px" }}
                />
              )}
            </IconButton>
            <Message sx={{ fontSize: "1.6rem", cursor: "pointer" }} />
            <Notifications sx={{ fontSize: "1.6rem", cursor: "pointer" }} />
            <Help sx={{ fontSize: "1.6rem", cursor: "pointer" }} />
            <FormControl variant="standard" value={username}>
              <Select
                value={username}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={username}>
                  <Typography>{username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;

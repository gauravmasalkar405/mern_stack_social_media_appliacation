import { Box } from "@mui/material";
import { host } from "../routes/userRoutes";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={`${host}/assets/${image}`}
        alt=""
      />
    </Box>
  );
};

export default UserImage;

import { Box } from "@mui/material";
import { host } from "../routes/userRoutes";

const UserMulter = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        src={`${host}/assets/${image}`}
        height={size}
        alt=""
      />
    </Box>
  );
};

export default UserMulter;

import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="User pic"
        width={size}
        height={size}
        src={`http://localhost:3500/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;

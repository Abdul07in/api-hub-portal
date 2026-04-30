import { type FC } from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  size?: number;
}

const Loader: FC<LoaderProps> = ({ size = 28 }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;

import { type FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import "./Loader.scss";

interface LoaderProps {
  size?: number;
}

const Loader: FC<LoaderProps> = ({ size = 28 }) => {
  return (
    <Box className="loader">
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;

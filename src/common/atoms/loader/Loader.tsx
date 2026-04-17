import { Box, CircularProgress } from "@mui/material";

export default function Loader({ size = 28 }: { size?: number }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}>
      <CircularProgress size={size} />
    </Box>
  );
}

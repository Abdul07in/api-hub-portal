import { Outlet } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box } from "@mui/material";

import { theme } from "@/common/styles/theme";
import Header from "@/common/templates/header/Header";
import Footer from "@/common/templates/footer/Footer";

export default function AppLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

import { Outlet } from "react-router-dom";
import { ThemeProvider, CssBaseline, StyledEngineProvider } from "@mui/material";
import { Box } from "@mui/material";
import type { CSSProperties } from "react";

import { theme } from "@/common/styles/theme";
import Header from "@/common/templates/header/Header";
import Footer from "@/common/templates/footer/Footer";
import { APP_LAYOUT_CONFIG } from "./serviceconstant";
import "./AppLayout.scss";

export default function AppLayout() {
  const spacerStyle = {
    "--app-layout-header-spacer-mobile": `${APP_LAYOUT_CONFIG.headerSpacerMobilePx}px`,
    "--app-layout-header-spacer-desktop": `${APP_LAYOUT_CONFIG.headerSpacerDesktopPx}px`,
  } as CSSProperties;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="app-layout">
          <Header />
          <Box className="app-layout__header-spacer" style={spacerStyle} />
          <Box className="app-layout__content">
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

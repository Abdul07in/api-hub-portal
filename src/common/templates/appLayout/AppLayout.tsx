import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, StyledEngineProvider } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, type FC, type CSSProperties } from "react";

import { theme } from "@/common/styles/theme";
import Header from "@/common/templates/header/Header";
import Footer from "@/common/templates/footer/Footer";
import { APP_LAYOUT_CONFIG } from "./serviceconstant";
import "./AppLayout.scss";

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const AppLayout: FC = () => {
  const spacerStyle = {
    "--app-layout-header-spacer-mobile": `${APP_LAYOUT_CONFIG.headerSpacerMobilePx}px`,
    "--app-layout-header-spacer-desktop": `${APP_LAYOUT_CONFIG.headerSpacerDesktopPx}px`,
  } as CSSProperties;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="app-layout">
          <ScrollToTop />
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
};

export default AppLayout;

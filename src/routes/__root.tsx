import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box, Button, Container, Typography } from "@mui/material";

import { theme } from "@/common/styles/theme";
import Header from "@/common/templates/header/Header";
import Footer from "@/common/templates/footer/Footer";

function NotFoundComponent() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography sx={{ fontSize: 96, fontWeight: 800, color: "secondary.main", lineHeight: 1 }}>404</Typography>
        <Typography variant="h5" sx={{ mt: 1, color: "secondary.main" }}>Page not found</Typography>
        <Typography sx={{ mt: 1, color: "text.secondary" }}>
          The page you're looking for doesn't exist.
        </Typography>
        <Button href="/" variant="contained" color="primary" sx={{ mt: 3 }}>
          Go home
        </Button>
      </Box>
    </Container>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h5" color="error">Something went wrong</Typography>
      <Typography sx={{ mt: 1, color: "text.secondary" }}>{error.message}</Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Retry
      </Button>
    </Container>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ICICI Pru AMC PartnerHub — API Developer Portal" },
      {
        name: "description",
        content:
          "Browse and try ICICI Prudential AMC PartnerHub APIs — KYC, FATCA, Tax Status and PAN verification, with an in-browser sandbox.",
      },
      { name: "author", content: "ICICI Pru AMC PartnerHub" },
      { property: "og:title", content: "ICICI Pru AMC PartnerHub — API Developer Portal" },
      {
        property: "og:description",
        content:
          "Browse and try ICICI Prudential AMC PartnerHub APIs in your browser — no credentials required.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}


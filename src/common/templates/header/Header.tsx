import { useState } from "react";
import { Link as RouterLink, useLocation } from "@tanstack/react-router";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import ApiIcon from "@mui/icons-material/Api";

const NAV: { label: string; to: string }[] = [
  { label: "API Products", to: "/api-products" },
  { label: "Sandbox", to: "/sandbox" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: "flex", alignItems: "center", gap: 1.25, textDecoration: "none", color: "inherit" }}
          >
            {/* Logo placeholder — drop /public/logo.png to override */}
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 1.5,
                bgcolor: "secondary.main",
                color: "#fff",
                display: "grid",
                placeItems: "center",
              }}
            >
              <ApiIcon fontSize="small" />
            </Box>
            <Box sx={{ lineHeight: 1.1 }}>
              <Typography sx={{ fontWeight: 800, color: "secondary.main", fontSize: 16 }}>
                ICICI Pru AMC
              </Typography>
              <Typography sx={{ fontSize: 11, letterSpacing: 1.5, color: "primary.main", fontWeight: 700 }}>
                PARTNERHUB · DEVELOPERS
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
            {NAV.map((n) => (
              <Button
                key={n.to}
                component={RouterLink}
                to={n.to}
                sx={{
                  color: isActive(n.to) ? "primary.main" : "text.primary",
                  fontWeight: 600,
                  borderBottom: 2,
                  borderColor: isActive(n.to) ? "primary.main" : "transparent",
                  borderRadius: 0,
                  px: 1.5,
                }}
              >
                {n.label}
              </Button>
            ))}
          </Stack>

          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            Login
          </Button>

          <IconButton sx={{ display: { md: "none" } }} onClick={() => setOpen(true)} aria-label="open menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {NAV.map((n) => (
              <ListItem key={n.to} disablePadding>
                <ListItemButton component={RouterLink} to={n.to}>
                  <ListItemText
                    primary={n.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(n.to) ? 700 : 500,
                      color: isActive(n.to) ? "primary.main" : "text.primary",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem sx={{ mt: 2, px: 2 }}>
              <Button fullWidth variant="contained" color="primary" startIcon={<LoginIcon />}>
                Login
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

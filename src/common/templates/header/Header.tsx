import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
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
import iciciLogo from "@/common/assets/ICICI_Prudential_Mutual_Fund_Official_Logo.jpg";

const NAV: { label: string; to: string }[] = [
  { label: "API Products", to: "/api-products" },
  { label: "Sandbox", to: "/sandbox" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 }, gap: { xs: 1, md: 2 } }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              textDecoration: "none",
              color: "inherit",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={iciciLogo}
              alt="ICICI Prudential Mutual Fund"
              sx={{
                height: { xs: 40, md: 52 },
                width: "auto",
                borderRadius: 1,
                objectFit: "contain",
              }}
            />
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

          <IconButton
            sx={{ display: { md: "none" }, ml: "auto" }}
            onClick={() => setOpen(true)}
            aria-label="open menu"
            edge="end"
          >
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
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: isActive(n.to) ? 700 : 500,
                          color: isActive(n.to) ? "primary.main" : "text.primary",
                        },
                      },
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

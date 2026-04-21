import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import iciciLogo from "@/common/assets/ICICI_Prudential_Mutual_Fund_Official_Logo.jpg";
import { HEADER_CONTENT, HEADER_NAV } from "./serviceconstant";
import "./Header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <AppBar position="fixed" elevation={0} color="transparent" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="header__toolbar">
          <Box component={RouterLink} to="/" className="header__brand-link">
            <Box
              component="img"
              src={iciciLogo}
              alt="ICICI Prudential Mutual Fund"
              className="header__brand-logo"
            />
            <Box className="header__brand-copy">
              <Typography className="header__brand-title">{HEADER_CONTENT.brandTitle}</Typography>
              <Typography className="header__brand-tagline">
                {HEADER_CONTENT.brandTagline}
              </Typography>
            </Box>
          </Box>

          <Box className="header__spacer" />

          <Box className="header__nav-shell">
            {HEADER_NAV.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                className={`header__nav-button${isActive(item.to) ? " header__nav-button--active" : ""}`}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Chip
            label={HEADER_CONTENT.secureAccessLabel}
            color="secondary"
            variant="outlined"
            className="header__chip"
          />

          <Button
            component={RouterLink}
            to="/signup"
            variant="outlined"
            color="secondary"
            startIcon={<PersonAddAlt1Icon />}
            className="header__secondary-action"
          >
            {HEADER_CONTENT.signupLabel}
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            className="header__primary-action"
          >
            {HEADER_CONTENT.loginLabel}
          </Button>

          <IconButton
            className="header__menu-button"
            onClick={() => setOpen(true)}
            aria-label="open menu"
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box className="header__drawer" role="presentation" onClick={() => setOpen(false)}>
          <Box className="header__drawer-brand">
            <Avatar
              src={iciciLogo}
              alt="ICICI Prudential Mutual Fund"
              className="header__drawer-avatar"
            />
            <Box>
              <Typography className="header__drawer-title">
                {HEADER_CONTENT.mobileDrawerTitle}
              </Typography>
              <Typography className="header__drawer-subtitle">
                {HEADER_CONTENT.mobileDrawerSubtitle}
              </Typography>
            </Box>
          </Box>
          <Divider className="header__drawer-divider" />
          <List>
            {HEADER_NAV.map((item) => (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.to}
                  className={`header__drawer-item${isActive(item.to) ? " header__drawer-item--active" : ""}`}
                >
                  <Box>
                    <Typography
                      className={`header__drawer-text${isActive(item.to) ? " header__drawer-text--active" : ""}`}
                    >
                      {item.label}
                    </Typography>
                    {isActive(item.to) ? (
                      <Typography className="header__drawer-caption">
                        {HEADER_CONTENT.activeSectionLabel}
                      </Typography>
                    ) : null}
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding className="header__drawer-actions">
              <Button
                component={RouterLink}
                to="/signup"
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<PersonAddAlt1Icon />}
                className="header__drawer-button"
              >
                {HEADER_CONTENT.signupLabel}
              </Button>
            </ListItem>
            <ListItem disablePadding className="header__drawer-action--secondary">
              <Button
                component={RouterLink}
                to="/login"
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<LoginIcon />}
                className="header__drawer-button"
              >
                {HEADER_CONTENT.loginLabel}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

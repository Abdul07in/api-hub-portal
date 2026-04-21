import { Box, Container, Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  FOOTER_CONTENT,
  FOOTER_EXPLORE_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_RESOURCE_LINKS,
  FOOTER_SOCIAL_LINKS,
} from "./serviceconstant";
import "./Footer.scss";

export default function Footer() {
  const socialIcons = {
    LinkedIn: <LinkedInIcon />,
    Twitter: <TwitterIcon />,
    YouTube: <YouTubeIcon />,
  };

  return (
    <Box component="footer" className="footer">
      <Container maxWidth="xl" className="footer__container">
        <Box className="footer__grid">
          <Box>
            <Typography className="footer__brand-title">{FOOTER_CONTENT.brandTitle}</Typography>
            <Typography className="footer__brand-copy">
              {FOOTER_CONTENT.brandDescription}
            </Typography>
          </Box>
          <Box>
            <Typography className="footer__section-title">{FOOTER_CONTENT.exploreTitle}</Typography>
            <Stack className="footer__link-stack">
              {FOOTER_EXPLORE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.to!}
                  underline="hover"
                  className="footer__link"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography className="footer__section-title">
              {FOOTER_CONTENT.resourcesTitle}
            </Typography>
            <Stack className="footer__link-stack">
              {FOOTER_RESOURCE_LINKS.map((link) => (
                <Link key={link.label} href={link.href} underline="hover" className="footer__link">
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography className="footer__section-title">{FOOTER_CONTENT.connectTitle}</Typography>
            <Stack direction="row" className="footer__social-stack">
              {FOOTER_SOCIAL_LINKS.map((item) => (
                <IconButton
                  key={item.label}
                  size="small"
                  href={item.href}
                  aria-label={item.label}
                  className="footer__social-button"
                >
                  {socialIcons[item.label as keyof typeof socialIcons]}
                </IconButton>
              ))}
            </Stack>
            <Typography className="footer__support-email">{FOOTER_CONTENT.supportEmail}</Typography>
          </Box>
        </Box>
        <Divider className="footer__divider" />
        <Stack direction={{ xs: "column", md: "row" }} className="footer__meta">
          <Typography className="footer__copyright">
            © {new Date().getFullYear()} ICICI Prudential Asset Management Company Ltd. All rights
            reserved.
          </Typography>
          <Stack direction="row" className="footer__legal-stack">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                underline="hover"
                className="footer__legal-link"
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

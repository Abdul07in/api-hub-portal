import { Box, Container, Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "secondary.main", color: "#e7eef6", mt: 8 }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.6fr 1fr 1.2fr 1fr" },
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
              ICICI Pru AMC · PartnerHub
            </Typography>
            <Typography sx={{ mt: 1, fontSize: 14, opacity: 0.85 }}>
              The developer portal for our distribution partners. Build, test and integrate with our
              APIs in minutes.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>Explore</Typography>
            <Stack spacing={0.5}>
              <Link component={RouterLink} to="/api-products" color="inherit" underline="hover">
                API Products
              </Link>
              <Link component={RouterLink} to="/sandbox" color="inherit" underline="hover">
                Sandbox
              </Link>
              <Link component={RouterLink} to="/faqs" color="inherit" underline="hover">
                FAQs
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Stack>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>Resources</Typography>
            <Stack spacing={0.5}>
              <Link href="#" color="inherit" underline="hover">
                Authentication Guide
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Status Page
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Changelog
              </Link>
              <Link href="#" color="inherit" underline="hover">
                SLA
              </Link>
            </Stack>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>Connect</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: "#fff" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "#fff" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "#fff" }}>
                <YouTubeIcon />
              </IconButton>
            </Stack>
            <Typography sx={{ mt: 2, fontSize: 13, opacity: 0.85 }}>
              partnerhub.support@icicipruamc.com
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.18)" }} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography sx={{ fontSize: 12, opacity: 0.8 }}>
            © {new Date().getFullYear()} ICICI Prudential Asset Management Company Ltd. All rights
            reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: 12 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: 12 }}>
              Terms of Use
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: 12 }}>
              Disclaimer
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

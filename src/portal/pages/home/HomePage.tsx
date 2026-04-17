import { Box, Button, Container, Stack, Typography, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ScienceIcon from "@mui/icons-material/Science";
import ApiIcon from "@mui/icons-material/Api";
import { useSelector } from "react-redux";
import { selectModules } from "@/store/slices/apiCatalogSlice";

export default function HomePage() {
  const apiCatalog = useSelector(selectModules);
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #155686 0%, #1f6fa8 60%, #e15325 140%)",
          color: "#fff",
          py: { xs: 6, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ color: "#ffd2c2", letterSpacing: 2, fontSize: { xs: 10, sm: 12 } }}>
            ICICI PRU AMC · PARTNERHUB
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, maxWidth: 820, fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.75rem" } }}>
            The developer portal for our distribution partners.
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 720, fontSize: { xs: 15, md: 18 }, opacity: 0.92 }}>
            Browse our API catalog, inspect every request and response, and try endpoints instantly
            in the in-browser Sandbox — no credentials needed.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
            <Button
              component={RouterLink}
              to="/api-products"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ApiIcon />}
              fullWidth={{ xs: true, sm: false }}
            >
              Explore API Catalog
            </Button>
            <Button
              component={RouterLink}
              to="/sandbox"
              variant="outlined"
              size="large"
              startIcon={<ScienceIcon />}
              fullWidth={{ xs: true, sm: false }}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              Open Sandbox
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Module grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 2 }}>
          MODULES
        </Typography>
        <Typography variant="h4" sx={{ color: "secondary.main", fontWeight: 800, mt: 0.5, mb: 3 }}>
          What you can build today
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          }}
        >
          {apiCatalog.map((m) => (
            <Box
              key={m.id}
              component={RouterLink}
              to="/api-products"
              sx={{
                textDecoration: "none",
                p: 3,
                borderRadius: 2.5,
                border: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                transition: "all .2s",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px -10px rgba(225,83,37,0.35)",
                },
              }}
            >
              <Typography
                sx={{ fontSize: 12, color: "primary.main", fontWeight: 700, letterSpacing: 1 }}
              >
                {m.apis.length} {m.apis.length === 1 ? "ENDPOINT" : "ENDPOINTS"}
              </Typography>
              <Typography variant="h6" sx={{ color: "secondary.main", fontWeight: 700, mt: 0.5 }}>
                {m.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {m.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

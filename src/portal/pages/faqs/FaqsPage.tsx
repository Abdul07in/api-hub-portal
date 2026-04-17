import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { faqGroups } from "@/common/helpers/constant/faqs";

export default function FaqsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return faqGroups;
    return faqGroups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) => it.q.toLowerCase().includes(term) || it.a.toLowerCase().includes(term),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [q]);

  return (
    <Box>
      <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 2 }}>
        HELP CENTER
      </Typography>
      <Typography variant="h3" sx={{ color: "secondary.main", fontWeight: 800, mt: 1 }}>
        Frequently Asked Questions
      </Typography>
      <Typography sx={{ mt: 1, mb: 3, color: "text.secondary", maxWidth: 640 }}>
        Quick answers to the most common questions about onboarding, authentication, modules and the
        sandbox.
      </Typography>

      <TextField
        fullWidth
        placeholder="Search FAQs"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 4, maxWidth: 560 }}
      />

      <Stack spacing={4}>
        {filtered.map((g) => (
          <Box key={g.category}>
            <Typography
              variant="h6"
              sx={{
                color: "secondary.main",
                mb: 1.5,
                borderBottom: 2,
                borderColor: "primary.main",
                display: "inline-block",
                pb: 0.5,
              }}
            >
              {g.category}
            </Typography>
            {g.items.map((it, i) => (
              <Accordion key={i} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>{it.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{it.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
        {filtered.length === 0 && (
          <Typography color="text.secondary">No results for "{q}".</Typography>
        )}
      </Stack>
    </Box>
  );
}

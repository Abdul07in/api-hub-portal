import { useState } from "react";
import { Alert, Box, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Form {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const EMPTY: Form = { name: "", email: "", company: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [snack, setSnack] = useState(false);

  const validate = (): boolean => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Required";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please provide at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSnack(true);
    setForm(EMPTY);
  };

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Box>
      <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 2, fontSize: { xs: 10, sm: 12 } }}>
        GET IN TOUCH
      </Typography>
      <Typography variant="h3" sx={{ color: "secondary.main", fontWeight: 800, mt: 1, fontSize: { xs: "1.75rem", md: "3rem" } }}>
        Contact Us
      </Typography>
      <Typography sx={{ mt: 1, mb: 4, color: "text.secondary", maxWidth: 640, fontSize: { xs: 14, md: 16 } }}>
        Want to integrate with PartnerHub APIs or have a question about onboarding? Send us a
        message and our developer relations team will respond within one business day.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
          alignItems: "start",
        }}
      >
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: "secondary.main", mb: 2 }}>
            Reach us directly
          </Typography>
          <Stack spacing={2.5}>
            <InfoRow
              icon={<EmailIcon color="primary" />}
              label="Email"
              value="partnerhub.support@icicipruamc.com"
            />
            <InfoRow
              icon={<PhoneIcon color="primary" />}
              label="Phone"
              value="1800-222-999 (toll free)"
            />
            <InfoRow
              icon={<LocationOnIcon color="primary" />}
              label="Office"
              value="One BKC, A-Wing, 13th Floor, Bandra Kurla Complex, Mumbai 400051"
            />
            <InfoRow
              icon={<AccessTimeIcon color="primary" />}
              label="Support Hours"
              value="Mon–Fri, 9:00 AM – 6:00 PM IST"
            />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Full name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={set("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={form.email}
                  onChange={set("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Company"
                  fullWidth
                  value={form.company}
                  onChange={set("company")}
                />
                <TextField
                  label="Subject"
                  fullWidth
                  required
                  value={form.subject}
                  onChange={set("subject")}
                  error={!!errors.subject}
                  helperText={errors.subject}
                />
              </Stack>
              <TextField
                label="Message"
                fullWidth
                required
                multiline
                minRows={5}
                value={form.message}
                onChange={set("message")}
                error={!!errors.message}
                helperText={errors.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth={{ xs: true, sm: false }}
                sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
              >
                Send Message
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snack}
        autoHideDuration={4000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnack(false)}>
          Thanks! Your message has been sent.
        </Alert>
      </Snackbar>
    </Box>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
      <Box sx={{ mt: 0.25 }}>{icon}</Box>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 13, color: "secondary.main" }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{value}</Typography>
      </Box>
    </Stack>
  );
}

import { Alert, Box, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Form } from "./validation";
import { CONTENT } from "./serviceconstant";
import "./ContactTemplate.scss";

export interface ContactTemplateProps {
  form: Form;
  errors: Partial<Record<keyof Form, string>>;
  snack: boolean;
  setSnack: (val: boolean) => void;
  handleSubmit: (ev: React.FormEvent) => void;
  setField: (
    k: keyof Form,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} className="contact-template__info-row">
      <Box className="contact-template__info-icon-wrapper">{icon}</Box>
      <Box>
        <Typography className="contact-template__info-label">{label}</Typography>
        <Typography className="contact-template__info-value">{value}</Typography>
      </Box>
    </Stack>
  );
}

export default function ContactTemplate({
  form,
  errors,
  snack,
  setSnack,
  handleSubmit,
  setField,
}: ContactTemplateProps) {
  return (
    <Box className="contact-template">
      <Typography variant="overline" className="contact-template__hero-overline">
        {CONTENT.hero.overline}
      </Typography>
      <Typography variant="h3" className="contact-template__hero-title">
        {CONTENT.hero.title}
      </Typography>
      <Typography className="contact-template__hero-desc">{CONTENT.hero.description}</Typography>

      <Box className="contact-template__grid">
        <Paper variant="outlined" className="contact-template__paper">
          <Typography variant="h6" className="contact-template__reach-title">
            {CONTENT.reachUs.title}
          </Typography>
          <Box className="contact-template__reach-stack">
            <InfoRow
              icon={<EmailIcon color="primary" />}
              label={CONTENT.reachUs.email.label}
              value={CONTENT.reachUs.email.value}
            />
            <InfoRow
              icon={<PhoneIcon color="primary" />}
              label={CONTENT.reachUs.phone.label}
              value={CONTENT.reachUs.phone.value}
            />
            <InfoRow
              icon={<LocationOnIcon color="primary" />}
              label={CONTENT.reachUs.office.label}
              value={CONTENT.reachUs.office.value}
            />
            <InfoRow
              icon={<AccessTimeIcon color="primary" />}
              label={CONTENT.reachUs.supportHours.label}
              value={CONTENT.reachUs.supportHours.value}
            />
          </Box>
        </Paper>

        <Paper variant="outlined" className="contact-template__paper">
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box className="contact-template__form-stack">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                className="contact-template__form-row"
              >
                <TextField
                  label={CONTENT.form.fullName}
                  fullWidth
                  required
                  value={form.name}
                  onChange={setField("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  label={CONTENT.form.email}
                  type="email"
                  fullWidth
                  required
                  value={form.email}
                  onChange={setField("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                className="contact-template__form-row"
              >
                <TextField
                  label={CONTENT.form.company}
                  fullWidth
                  value={form.company}
                  onChange={setField("company")}
                />
                <TextField
                  label={CONTENT.form.subject}
                  fullWidth
                  required
                  value={form.subject}
                  onChange={setField("subject")}
                  error={!!errors.subject}
                  helperText={errors.subject}
                />
              </Stack>
              <TextField
                label={CONTENT.form.message}
                fullWidth
                required
                multiline
                minRows={5}
                value={form.message}
                onChange={setField("message")}
                error={!!errors.message}
                helperText={errors.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className="contact-template__submit-btn"
              >
                {CONTENT.form.submitBtn}
              </Button>
            </Box>
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
          {CONTENT.form.successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

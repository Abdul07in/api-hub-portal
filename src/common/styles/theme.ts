import { createTheme } from "@mui/material/styles";

export const BRAND = {
  bg: "#fffaf6",
  primary: "#e15325",
  secondary: "#155686",
  primaryDark: "#b9421d",
  secondaryDark: "#0f3f63",
  surface: "#ffffff",
  border: "#f0e3d8",
  textPrimary: "#1f2937",
  textSecondary: "#5b6472",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    background: { default: BRAND.bg, paper: BRAND.surface },
    primary: { main: BRAND.primary, dark: BRAND.primaryDark, contrastText: "#fff" },
    secondary: { main: BRAND.secondary, dark: BRAND.secondaryDark, contrastText: "#fff" },
    text: { primary: BRAND.textPrimary, secondary: BRAND.textSecondary },
    divider: BRAND.border,
  },
  typography: {
    fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#ffffff", color: BRAND.secondary, boxShadow: "0 1px 0 rgba(0,0,0,0.06)" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 18 },
        containedPrimary: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: `1px solid ${BRAND.border}`, boxShadow: "none" },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${BRAND.border}`,
          borderRadius: 10,
          "&:before": { display: "none" },
          "&.Mui-expanded": { margin: 0 },
          marginBottom: 12,
        },
      },
    },
    MuiTab: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } },
  },
});

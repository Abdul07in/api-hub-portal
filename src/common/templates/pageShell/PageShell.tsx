import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | false;
}

export default function PageShell({ children, maxWidth = "lg" }: Props) {
  return (
    <Box component="main" sx={{ minHeight: "calc(100vh - 64px - 220px)", py: { xs: 4, md: 6 } }}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}

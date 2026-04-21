import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";
import { DEFAULT_PAGE_SHELL_MAX_WIDTH } from "./serviceconstant";
import "./PageShell.scss";

interface Props {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | false;
}

export default function PageShell({ children, maxWidth = DEFAULT_PAGE_SHELL_MAX_WIDTH }: Props) {
  return (
    <Box component="main" className="page-shell">
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}

import { Box, Container } from "@mui/material";
import { type FC, type ReactNode } from "react";
import { DEFAULT_PAGE_SHELL_MAX_WIDTH } from "./serviceconstant";
import "./PageShell.scss";

interface PageShellProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | false;
}

const PageShell: FC<PageShellProps> = ({ children, maxWidth = DEFAULT_PAGE_SHELL_MAX_WIDTH }) => {
  return (
    <Box component="main" className="page-shell">
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};

export default PageShell;

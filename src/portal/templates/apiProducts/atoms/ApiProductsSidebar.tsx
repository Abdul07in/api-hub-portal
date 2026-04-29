import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import type { ApiModule } from "@/common/interfaces/api";
import { CONTENT } from "../serviceconstant";

interface ApiProductsSidebarProps {
  search: string;
  setSearch: (value: string) => void;
  filteredModules: ApiModule[];
  activeModuleId: string;
  setActiveModuleId: (value: string) => void;
  activeApiId?: string | null;
  setActiveApiId?: (value: string | null) => void;
}

export default function ApiProductsSidebar({
  search,
  setSearch,
  filteredModules,
  activeModuleId,
  setActiveModuleId,
  activeApiId,
  setActiveApiId,
}: ApiProductsSidebarProps) {
  return (
    <Box className="api-products-page__sidebar">
      <TextField
        fullWidth
        size="small"
        placeholder={CONTENT.searchPlaceholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        className="api-products-page__search"
        sx={{ mb: 2 }}
      />

      <Box className="api-products-page__menu">
        {/* Introduction nav item */}
        <Box
          className={`sidebar-intro-item ${activeModuleId === "introduction" ? "sidebar-intro-item--active" : ""}`}
          onClick={() => {
            setActiveModuleId("introduction");
            setActiveApiId?.(null);
          }}
        >
          <Typography className="sidebar-intro-item__label">Introduction</Typography>
        </Box>

        {filteredModules.map((module) => {
          const isModuleActive = activeModuleId === module.id;

          return (
            <Accordion
              key={module.id}
              disableGutters
              elevation={0}
              expanded={isModuleActive}
              onChange={(_, expanded) => {
                if (expanded) {
                  setActiveModuleId(module.id);
                  setActiveApiId?.(null);
                } else {
                  setActiveModuleId("introduction");
                  setActiveApiId?.(null);
                }
              }}
              className="sidebar-module"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
                <Typography
                  className={`sidebar-module__title ${
                    isModuleActive && !activeApiId ? "sidebar-module__title--active" : ""
                  }`}
                >
                  {module.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="sidebar-module__details">
                <Stack spacing={0.5}>
                  {module.apis.map((api) => {
                    const isApiActive = activeApiId === api.id;

                    return (
                      <Button
                        key={api.id}
                        fullWidth
                        disableRipple
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveModuleId(module.id);
                          setActiveApiId?.(api.id);
                        }}
                        className={`sidebar-api ${isApiActive ? "sidebar-api--active" : ""}`}
                        startIcon={
                          isApiActive ? (
                            <VerifiedUserIcon color="primary" fontSize="small" />
                          ) : api.id.includes("prospect") ? (
                            <PersonAddAlt1Icon color="action" fontSize="small" />
                          ) : (
                            <DescriptionOutlinedIcon color="action" fontSize="small" />
                          )
                        }
                      >
                        {api.name}
                      </Button>
                    );
                  })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}

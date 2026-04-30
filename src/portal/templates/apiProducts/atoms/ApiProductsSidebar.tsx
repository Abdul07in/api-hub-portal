import { type FC } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const ApiProductsSidebar: FC<ApiProductsSidebarProps> = ({
  search,
  setSearch,
  filteredModules,
  activeModuleId,
  setActiveModuleId,
  activeApiId,
  setActiveApiId,
}: ApiProductsSidebarProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const handleIntroClick = () => {
    setActiveModuleId("introduction");
    setActiveApiId?.(null);
  };

  const handleAccordionChange = (value: string) => {
    setActiveModuleId(value || "introduction");
    setActiveApiId?.(null);
  };

  const createApiClickHandler =
    (moduleId: string, apiId: string) => (event: React.MouseEvent) => {
      event.stopPropagation();
      setActiveModuleId(moduleId);
      setActiveApiId?.(apiId);
    };

  return (
    <Box className="api-products-page__sidebar">
      <TextField
        fullWidth
        size="small"
        placeholder={CONTENT.searchPlaceholder}
        value={search}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        className="api-products-page__search api-products-page__search--spaced"
      />

      <Box className="api-products-page__menu">
        {/* Introduction nav item */}
        <Box
          className={`sidebar-intro-item ${activeModuleId === "introduction" ? "sidebar-intro-item--active" : ""}`}
          onClick={handleIntroClick}
        >
          <Typography className="sidebar-intro-item__label">Introduction</Typography>
        </Box>

        <Accordion
          type="single"
          collapsible
          value={activeModuleId !== "introduction" ? activeModuleId : ""}
          onValueChange={handleAccordionChange}
        >
          {filteredModules.map((module) => {
            const isModuleActive = activeModuleId === module.id;

            return (
              <AccordionItem key={module.id} value={module.id} className="sidebar-module">
                <AccordionTrigger className="sidebar-module__trigger">
                  <Typography
                    className={`sidebar-module__title ${
                      isModuleActive && !activeApiId ? "sidebar-module__title--active" : ""
                    }`}
                  >
                    {module.name}
                  </Typography>
                </AccordionTrigger>
                <AccordionContent className="sidebar-module__details !p-0">
                  <Stack spacing={0.5}>
                    {module.apis.map((api) => {
                      const isApiActive = activeApiId === api.id;

                      return (
                        <Button
                          key={api.id}
                          fullWidth
                          disableRipple
                          onClick={createApiClickHandler(module.id, api.id)}
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
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </Box>
  );
};

export default ApiProductsSidebar;

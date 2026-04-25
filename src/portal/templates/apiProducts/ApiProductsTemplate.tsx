import { Box } from "@mui/material";

import type { ApiSpec, ApiModule } from "@/common/interfaces/api";
import {
  ApiDetailsHeader,
  ApiProductsHero,
  ApiProductsSidebar,
  ApiTabs,
  EndpointsInGroupCard,
  ModuleOverview,
} from "./atoms";
import "./ApiProductsTemplate.scss";

export interface ApiProductsTemplateProps {
  search: string;
  setSearch: (val: string) => void;
  filteredModules: ApiModule[];
  activeModuleId: string;
  setActiveModuleId: (val: string) => void;
  activeModule: ApiModule | null;
  activeApiId?: string | null;
  setActiveApiId?: (val: string | null) => void;
  activeApi?: ApiSpec | null;
  onTryInSandbox: (id: string) => void;
  isSubscribed: boolean;
}

export default function ApiProductsTemplate({
  search,
  setSearch,
  filteredModules,
  activeModuleId,
  setActiveModuleId,
  activeModule,
  activeApiId,
  setActiveApiId,
  activeApi,
  onTryInSandbox,
  isSubscribed,
}: ApiProductsTemplateProps) {
  return (
    <Box className="api-products-page">
      <Box className="api-products-page__layout">
        <ApiProductsSidebar
          search={search}
          setSearch={setSearch}
          filteredModules={filteredModules}
          activeModuleId={activeModuleId}
          setActiveModuleId={setActiveModuleId}
          activeApiId={activeApiId}
          setActiveApiId={setActiveApiId}
        />

        <Box className="api-products-page__main">
          <ApiProductsHero />

          {activeModule && (
            <Box className="api-details-grid">
              <Box className="api-details-main">
                {activeApi ? (
                  <>
                    <ApiDetailsHeader
                      module={activeModule}
                      api={activeApi}
                      onBackToModule={() => setActiveApiId?.(null)}
                    />
                    <ApiTabs
                      api={activeApi}
                      onTryInSandbox={onTryInSandbox}
                      isSubscribed={isSubscribed}
                    />
                  </>
                ) : (
                  <ModuleOverview
                    module={activeModule}
                    onApiSelect={(id) => setActiveApiId && setActiveApiId(id)}
                  />
                )}
              </Box>

              {activeApi && (
                <Box className="api-details-side">
                  <EndpointsInGroupCard
                    module={activeModule}
                    activeApi={activeApi}
                    onSelectApi={setActiveApiId}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

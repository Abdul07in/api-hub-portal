import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ApiModule } from "@/common/interfaces/api";
import { parseSwaggerToCatalog } from "@/common/helpers/utils/swaggerParser";

interface ApiCatalogState {
  modules: ApiModule[];
  activeModuleId: string | null;
}

const initialModules = parseSwaggerToCatalog();

const initialState: ApiCatalogState = {
  modules: initialModules,
  activeModuleId: initialModules.length > 0 ? initialModules[0].id : null,
};

export const apiCatalogSlice = createSlice({
  name: "apiCatalog",
  initialState,
  reducers: {
    setActiveModuleId: (state, action: PayloadAction<string>) => {
      state.activeModuleId = action.payload;
    },
  },
});

export const { setActiveModuleId } = apiCatalogSlice.actions;

export const selectModules = (state: { apiCatalog: ApiCatalogState }) => state.apiCatalog.modules;
export const selectActiveModuleId = (state: { apiCatalog: ApiCatalogState }) =>
  state.apiCatalog.activeModuleId;

export const selectApiById = (state: { apiCatalog: ApiCatalogState }, apiId: string) => {
  for (const m of state.apiCatalog.modules) {
    const api = m.apis.find((a) => a.id === apiId);
    if (api) return { module: m, api };
  }
  return null;
};

export default apiCatalogSlice.reducer;

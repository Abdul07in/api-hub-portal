import { configureStore } from "@reduxjs/toolkit";
import apiCatalogReducer from "./slices/apiCatalogSlice";

export const store = configureStore({
  reducer: {
    apiCatalog: apiCatalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

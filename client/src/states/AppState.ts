import ApiData from "../types/ApiData";

export type AppState = {
  // Data wrapper
  data?: ApiData;
  // Query string
  query: string;
  // True if is searching
  isSearching: boolean;
  // True if webpage is reloaded or first opened
  isFirstOpen: boolean;
};

export const initialAppState: AppState = {
  // Empty query
  query: "",
  // Not searching
  isSearching: false,
  // Show full screen main page
  isFirstOpen: true,
};

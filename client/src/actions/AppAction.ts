import ApiData from "../types/ApiData";

/**
 * Actions to update app state
 */
export type AppAction =
  // Update api data
  | { type: "setData"; payload: ApiData }
  // Update query string
  | { type: "setQuery"; payload: string }
  // Set is searching
  | { type: "setSearch"; payload: boolean }
  // Set webpage is reloaded or opened for first time
  | { type: "setIsFirstOpen"; payload: boolean };

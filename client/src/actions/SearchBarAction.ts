/**
 * Actions to update search bar state
 */
export type SearchBarAction =
  // Update autocomplete options
  | { type: "setAutocompleteOptions"; payload: Array<string> }
  // Set is loading autocomplete
  | { type: "setIsLoadingAutocomplete"; payload: boolean };

export type SearchBarState = {
  // Array of autocomplete options
  autocompleteOptions: Array<string>;
  // True if is loading autocomplete options
  isLoadingAutocomplete: boolean;
};

export const initialSearchBarState: SearchBarState = {
  // Empty candidates
  autocompleteOptions: [],
  // Not loading
  isLoadingAutocomplete: false,
};

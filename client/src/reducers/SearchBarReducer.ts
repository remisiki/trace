import { SearchBarState } from "../states/SearchBarState";
import { SearchBarAction } from "../actions/SearchBarAction";

export const searchBarReducer = (
  state: SearchBarState,
  action: SearchBarAction,
): SearchBarState => {
  switch (action.type) {
    case "setAutocompleteOptions":
      return { ...state, autocompleteOptions: action.payload };
    case "setIsLoadingAutocomplete":
      return { ...state, isLoadingAutocomplete: action.payload };
    default:
      return state;
  }
};

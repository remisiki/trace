import { AppState } from "../states/AppState";
import { AppAction } from "../actions/AppAction";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "setData":
      return { ...state, data: action.payload };
    case "setQuery":
      return { ...state, query: action.payload };
    case "setSearch":
      return { ...state, isSearching: action.payload };
    case "setIsFirstOpen":
      return { ...state, isFirstOpen: action.payload };
    default:
      return state;
  }
};

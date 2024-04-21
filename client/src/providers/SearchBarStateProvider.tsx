import SearchBarProps from "../components/props/SearchBarProps";
import { createStateContext, withStateProvider } from "./BaseStateProvider";

export const SearchBarStateContext = createStateContext<SearchBarProps>();

export const SearchBarStateProvider = withStateProvider(SearchBarStateContext);

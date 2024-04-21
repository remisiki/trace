import { SearchBarState } from "../../states/SearchBarState";
import { SearchBarAction } from "../../actions/SearchBarAction";
import BaseStateProps from "./BaseStateProps";

interface SearchBarProps
  extends BaseStateProps<SearchBarState, SearchBarAction> {}

export default SearchBarProps;

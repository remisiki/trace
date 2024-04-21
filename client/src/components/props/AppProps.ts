import { AppState } from "../../states/AppState";
import { AppAction } from "../../actions/AppAction";
import BaseStateProps from "./BaseStateProps";

interface AppProps extends BaseStateProps<AppState, AppAction> {}

export default AppProps;

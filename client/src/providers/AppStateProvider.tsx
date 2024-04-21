import AppProps from "../components/props/AppProps";
import { createStateContext, withStateProvider } from "./BaseStateProvider";

export const AppStateContext = createStateContext<AppProps>();

export const AppStateProvider = withStateProvider(AppStateContext);

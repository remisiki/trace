import React, { useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { appReducer } from "./reducers/AppReducer";
import { initialAppState } from "./states/AppState";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";
import { AppStateProvider } from "./providers/AppStateProvider";
import MainWithSearchBarOnly from "./components/MainWithSearchBarOnly";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  return (
    <AppStateProvider stateProps={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        {state.isFirstOpen ? (
          <MainWithSearchBarOnly />
        ) : (
          <>
            <Header />
            <Main />
          </>
        )}
      </ThemeProvider>
    </AppStateProvider>
  );
};

export default App;

import React, { useContext } from "react";
import Loading from "./Loading";
import Results from "./Results";
import { AppStateContext } from "../providers/AppStateProvider";

/**
 * Main panel
 * @constructor
 */
const Main = () => {
  const context = useContext(AppStateContext);

  return (
    <>
      {context?.state.isSearching ? (
        <Loading />
      ) : context?.state.data ? (
        <main
          id={"main"}
          className={"align-items-center justify-content-center"}
        >
          <Results />
        </main>
      ) : (
        <></>
      )}
    </>
  );
};

export default Main;

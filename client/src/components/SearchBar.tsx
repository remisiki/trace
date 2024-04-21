import "../css/search-bar.css";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useReducer } from "react";
import { AppStateContext } from "../providers/AppStateProvider";
import theme from "../theme/Theme";
import { Search } from "@mui/icons-material";
import Api from "../common/Api";
import {
  SearchBarStateContext,
  SearchBarStateProvider,
} from "../providers/SearchBarStateProvider";
import { searchBarReducer } from "../reducers/SearchBarReducer";
import { initialSearchBarState } from "../states/SearchBarState";
import { AppAction } from "../actions/AppAction";
import Values from "../common/Values";

/**
 * Update query string on change
 * @param query
 * @param dispatch
 */
const onQueryChange = (query: string, dispatch: React.Dispatch<AppAction>) => {
  dispatch({ type: "setQuery", payload: query });
};

/**
 * Search bar text field
 * @param params Params from Autocomplete renderInput callback
 * @constructor
 */
const SearchInputTextField = (params: AutocompleteRenderInputParams) => {
  const appContext = useContext(AppStateContext);
  const appDispatch = appContext?.dispatch;
  const context = useContext(SearchBarStateContext);
  const dispatch = context?.dispatch;

  /**
   * Callback to update autocomplete results
   */
  const updateAutocomplete = useCallback(
    (query?: string) => {
      if (query && query.length > 3 && dispatch) {
        // Start loading
        dispatch({ type: "setIsLoadingAutocomplete", payload: true });
        // Fetch results
        Api.fetchComplete(query)
          .then((suggestions) => {
            if (suggestions) {
              dispatch({
                type: "setAutocompleteOptions",
                payload: suggestions,
              });
            }
          })
          .finally(() => {
            // End loading
            dispatch({ type: "setIsLoadingAutocomplete", payload: false });
          });
      }
    },
    [dispatch],
  );

  // Run autocomplete on query string change
  useEffect(() => {
    updateAutocomplete(appContext?.state.query);
  }, [appContext?.state.query, updateAutocomplete]);

  return (
    <>
      {dispatch && appDispatch && (
        <TextField
          {...params}
          id={"search-bar"}
          className={"text"}
          variant={"outlined"}
          placeholder={Values.DEFAULT_QUERY}
          InputProps={{
            ...params.InputProps,
            // Show loading circle when fetch autocomplete
            endAdornment: context?.state.isLoadingAutocomplete ? (
              <CircularProgress
                style={{ color: theme.palette.primary.main }}
                size={20}
              />
            ) : (
              <></>
            ),
            // Show search icon on the left
            startAdornment: (
              <InputAdornment position={"start"}>
                <Search style={{ fill: theme.palette.primary.main }} />
              </InputAdornment>
            ),
          }}
          onInput={(e) => {
            onQueryChange((e.target as HTMLInputElement).value, appDispatch);
          }}
          sx={{ "&>.MuiInputBase-root": { backgroundColor: "white" } }}
        />
      )}
    </>
  );
};

/**
 * Search bar autocomplete
 * @constructor
 */
const SearchInputAutocomplete = () => {
  const context = useContext(SearchBarStateContext);
  const options =
    context?.state.autocompleteOptions ??
    initialSearchBarState.autocompleteOptions;
  const appContext = useContext(AppStateContext);
  const appDispatch = appContext?.dispatch;

  return (
    <Autocomplete
      onChange={(e, newValue) => {
        if (appDispatch && newValue) {
          onQueryChange(newValue, appDispatch);
        }
      }}
      freeSolo={true}
      options={options}
      value={appContext?.state.query}
      disabled={appContext?.state.isSearching}
      fullWidth={true}
      componentsProps={{
        // Props that keep autocomplete at bottom
        popper: {
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
          ],
        },
      }}
      renderInput={(params) => <SearchInputTextField {...params} />}
    />
  );
};

/**
 * Search bar
 * @constructor
 */
const SearchBar = () => {
  const appContext = useContext(AppStateContext);
  const appDispatch = appContext?.dispatch;

  const [state, dispatch] = useReducer(searchBarReducer, initialSearchBarState);

  /**
   * On query submit
   * @param e
   */
  const onFormSubmit = (e: React.FormEvent) => {
    if (appDispatch) {
      // When start first search, disable full screen main panel
      appDispatch({ type: "setIsFirstOpen", payload: false });
      // Start searching
      appDispatch({ type: "setSearch", payload: true });

      let query = appContext?.state.query;
      // Set default query string if is empty
      if (query === "") {
        query = Values.DEFAULT_QUERY;
        appDispatch({ type: "setQuery", payload: query });
      }

      // Fetch results
      // FIXME Error handler
      Api.fetchData(query)
        .then((apiData) => {
          if (apiData) {
            // Update data
            appDispatch({ type: "setData", payload: apiData });
          }
        })
        .finally(() => {
          // Stop searching
          appDispatch({ type: "setSearch", payload: false });
        });
    }
    e.preventDefault();
  };

  return (
    <SearchBarStateProvider stateProps={{ state, dispatch }}>
      {appDispatch && (
        <form
          id={"search-form"}
          className={"row-flex justify-content-center"}
          onSubmit={onFormSubmit}
        >
          <SearchInputAutocomplete />
          <Button
            type={"submit"}
            variant={"contained"}
            disabled={appContext?.state.isSearching}
          >
            Go
          </Button>
        </form>
      )}
    </SearchBarStateProvider>
  );
};

export default SearchBar;

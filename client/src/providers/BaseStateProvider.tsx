import React, { createContext } from "react";
import BaseStateProps from "../components/props/BaseStateProps";

/**
 * Create a context with state and dispatch
 */
export const createStateContext = <T extends BaseStateProps<any, any>>() => {
  return createContext<T | undefined>(undefined);
};

export type PropsWithContext = {
  context: React.Context<any>;
};

type BaseStateProviderProps = React.PropsWithChildren & {
  stateProps: BaseStateProps<any, any>;
};

export const BaseStateProvider = ({
  children,
  context,
  stateProps,
}: BaseStateProviderProps & PropsWithContext) => {
  return <context.Provider value={stateProps}>{children}</context.Provider>;
};

/**
 * BaseStateProvider builder
 * @param context
 * @param stateProps
 * @param children
 * @example
 * // In parent component
 * // Basic example of building a StateProvider
 * // Change State, Action, reducer and initialState the same as how you build a reducer
 * interface StateProps extends BaseStateProps<State, Action> {}
 * export const StateContext = createStateContext<StateProps>();
 * const StateProvider = withStateProvider(StateContext);
 * export const App = () => {
 *   const [state, dispatch] = useReducer(reducer, initialState);
 *   return (
 *     <StateProvider stateProps={{ state, dispatch }}>
 *       {children}
 *     </StateProvider>
 *   );
 * }
 * @example
 * // In children component
 * // Access state and dispatch from inside children using context
 * const Child = () => {
 *   const context = useContext(StateContext);
 * }
 */
export const withStateProvider =
  (context: React.Context<any>) =>
  ({ stateProps, children }: BaseStateProviderProps) => {
    return (
      <BaseStateProvider context={context} stateProps={stateProps}>
        {children}
      </BaseStateProvider>
    );
  };

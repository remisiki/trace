/**
 * An abstract state props interface, contains state and dispatch
 */
interface BaseStateProps<T, U> {
  state: T;
  dispatch: React.Dispatch<U>;
}

export default BaseStateProps;

import React, { createContext, useReducer } from "react";

const initialState = {
  isLoggedIn: false,
};

type ContextProps = {
  authState: State;
  dispatch: ({ type }: { type: string; data: boolean }) => void;
};

const authContext = createContext({} as ContextProps);
const { Provider } = authContext;

type State = {
  isLoggedIn: boolean;
};

type Action = { type: String; data: boolean };

const AuthProvider: React.FC = ({ children }) => {
  const [authState, dispatch] = useReducer<React.Reducer<State, Action>>(
    (state, action) => {
      switch (action.type) {
        case "SET_AUTH":
          const { data } = action;
          state.isLoggedIn = data;
          return state;
        default:
          return state;
      }
    },
    initialState
  );

  return <Provider value={{ authState, dispatch }}>{children}</Provider>;
};

export { authContext, AuthProvider };

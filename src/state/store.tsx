import React, { createContext, useReducer } from "react";

type User = {
  userName: string;
  userId: string;
  color: string;
};

const initialState = {
  user: {
    userName: "",
    userId: "",
    color: "",
  },
};

type ContextProps = {
  state: State;
  dispatch: ({ type }: { type: string; data: User }) => void;
};

const store = createContext({} as ContextProps);
const { Provider } = store;

type State = {
  user: User;
};

type Action = { type: String; data?: User };

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    (state, action) => {
      switch (action.type) {
        case "setUser":
          const { data } = action;
          if (data) {
            state.user = data;
          }
          return state;
        default:
          throw new Error();
      }
    },
    initialState
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

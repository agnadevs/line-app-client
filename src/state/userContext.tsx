import React, { createContext, useReducer } from "react";

type User = {
  userName: string;
  userId: string;
  profileImageURL: string;
  color: string;
};

const initialState = {
  user: {
    userName: "",
    userId: "",
    profileImageURL: "",
    color: "",
  },
};

type ContextProps = {
  userState: State;
  dispatch: ({ type }: { type: string; data: User }) => void;
};

const userContext = createContext({} as ContextProps);
const { Provider } = userContext;

type State = {
  user: User;
};

type Action = { type: String; data: User };

const UserProvider: React.FC = ({ children }) => {
  const [userState, dispatch] = useReducer<React.Reducer<State, Action>>(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return { ...state, user: action.data };
        default:
          return state;
      }
    },
    initialState
  );

  return <Provider value={{ userState, dispatch }}>{children}</Provider>;
};

export { userContext, UserProvider };

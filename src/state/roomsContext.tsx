import React, { createContext, useReducer } from "react";
import { Room } from "../types";

const initialState = {
  rooms: [
    {
      title: "React",
      infoText: "This is a room about React",
      imageURL: "",
      path: "/chat/react",
    },
    {
      title: "Vue",
      infoText: "This is a room about Vue",
      imageURL: "",
      path: "/chat/vue",
    },
    {
      title: "Angular",
      infoText: "This is a room about Angular",
      imageURL: "",
      path: "/chat/angular",
    },
    {
      title: "Svelte",
      infoText: "This is a room about Svelte",
      imageURL: "",
      path: "/chat/svelte",
    },
  ],
};

type ContextProps = {
  roomsState: State;
  dispatch: ({ type }: { type: string; data: Room[] }) => void;
};

const roomsContext = createContext({} as ContextProps);
const { Provider } = roomsContext;

type State = {
  rooms: Room[] | null;
};

type Action = { type: String; data?: Room[] };

const RoomsProvider: React.FC = ({ children }) => {
  const [roomsState, dispatch] = useReducer<React.Reducer<State, Action>>(
    (state, action) => {
      switch (action.type) {
        case "SET_ROOMS":
          const { data } = action;
          if (data) {
            state.rooms = data;
          }
          return state;
        default:
          throw new Error();
      }
    },
    initialState
  );

  return <Provider value={{ roomsState, dispatch }}>{children}</Provider>;
};

export { roomsContext, RoomsProvider };

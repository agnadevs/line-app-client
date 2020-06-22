import React, { createContext, useState } from "react";
import { Room } from "../types";

const initialRooms = [
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
];

type ContextProps = {
  rooms: Room[] | null;
  updateRooms: (rooms: Room[]) => void;
};

const RoomsContext = createContext({} as ContextProps);

const RoomsProvider: React.FC = ({ children }) => {
  const [rooms, setRooms] = useState<Room[] | null>(initialRooms);

  const updateRooms = (rooms: Room[]) => {
    setRooms(rooms);
  };

  return (
    <RoomsContext.Provider value={{ rooms, updateRooms }}>
      {children}
    </RoomsContext.Provider>
  );
};

export { RoomsContext, RoomsProvider };

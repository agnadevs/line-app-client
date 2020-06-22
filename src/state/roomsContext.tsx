import React, { createContext, useState } from "react";
import { Room } from "../types";

type ContextProps = {
  rooms: Room[];
  setInitialRooms: (rooms: Room[]) => void;
  addNewRoom: (room: Room) => void;
};

const RoomsContext = createContext({} as ContextProps);

const RoomsProvider: React.FC = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const setInitialRooms = (rooms: Room[]) => {
    setRooms(rooms);
  };

  const addNewRoom = (newRoom: Room) => {
    setRooms((rooms) => [...rooms, newRoom]);
  };

  return (
    <RoomsContext.Provider value={{ rooms, setInitialRooms, addNewRoom }}>
      {children}
    </RoomsContext.Provider>
  );
};

export { RoomsContext, RoomsProvider };

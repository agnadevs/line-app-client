import React, { createContext, useState } from "react";
import { Room } from "../types";

type ContextProps = {
  rooms: Room[];
  setInitialRooms: (rooms: Room[]) => void;
  addNewRoom: (room: Room) => void;
  updateRoom: (updatedRoom: Room) => void;
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

  const updateRoom = (updatedRoom: Room) => {
    const updatedRoomIndex = rooms.findIndex(
      (room: Room) => room.roomId === updatedRoom.roomId
    );

    const allRooms = [...rooms];
    allRooms[updatedRoomIndex] = {
      ...allRooms[updatedRoomIndex],
      title: updatedRoom.title,
    };

    setRooms(allRooms);
  };
  return (
    <RoomsContext.Provider
      value={{ rooms, setInitialRooms, addNewRoom, updateRoom }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export { RoomsContext, RoomsProvider };

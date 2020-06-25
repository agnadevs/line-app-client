import React, { createContext, useState } from "react";
import { Room } from "../types";

type ContextProps = {
  rooms: Room[];
  setInitialRooms: (rooms: Room[]) => void;
  addNewRoom: (room: Room) => void;
  updateRoom: (updatedRoom: Room) => void;
  getRoomById: (id: number) => Room | undefined;
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

  const getRoomById = (id: number) => {
    return rooms.find((room: Room) => room.roomId === id);
  };
  return (
    <RoomsContext.Provider
      value={{ rooms, setInitialRooms, addNewRoom, updateRoom, getRoomById }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export { RoomsContext, RoomsProvider };

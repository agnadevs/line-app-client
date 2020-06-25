import { Room } from "./types";

export const getCurrentRoom = (roomArr: Room[], roomId: number) => {
  return roomArr.find((room: Room) => room.roomId === roomId);
};


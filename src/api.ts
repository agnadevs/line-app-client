import { Room, User } from "./types";
const path = "http://localhost:4000/api";

export const fetchRooms = async (
  userId: string,
  setStateCallback: (rooms: Room[]) => void
) => {
  const response = await fetch(`${path}/rooms/user/${userId}`);
  const { data, error } = await response.json();
  if (error) {
    console.log(error);
    return;
  }
  setStateCallback(data);
};

export const updateRoomById = async (
  roomId: number | null,
  body: string,
  onUpdateCallback: (room: Room, error: any) => void
) => {
  const response = await fetch(`${path}/rooms/${roomId}/update`, {
    method: "PUT",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data, error } = await response.json();
  onUpdateCallback(data, error);
};

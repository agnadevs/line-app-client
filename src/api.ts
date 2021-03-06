import { Room, User, ChatMessage } from "./types";
const path = "http://localhost:4000/api";

export const getRoomsByUserId = async (
  userId: string,
  onFetchedRooms: (rooms: Room[]) => void
) => {
  const response = await fetch(`${path}/rooms/user/${userId}`);
  const { data, error } = await response.json();
  if (error) {
    console.log(error);
    return;
  }
  onFetchedRooms(data);
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

export const getUsersByRoomId = async (
  roomId: number | null,
  onFetchedUsers: (usersWithoutAccess: User[], usersWithAccess: User[]) => void
) => {
  const response = await fetch(`${path}/rooms/${roomId}/users`, {});
  const { data } = await response.json();
  const { usersWithoutAccess, usersWithAccess } = data;
  onFetchedUsers(usersWithoutAccess, usersWithAccess);
};

export const postUserWithAccess = async (
  roomId: number | null,
  userId: string,
  onPostedUser: (usersWithoutAccess: User[], usersWithAccess: User[]) => void
) => {
  const response = await fetch(`${path}/rooms/${roomId}/users/${userId}`, {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  const { usersWithoutAccess, usersWithAccess } = data;
  onPostedUser(usersWithoutAccess, usersWithAccess);
};

export const deleteUserWithAccess = async (
  roomId: number | null,
  userId: string,
  onDeletedUser?: (usersWithoutAccess: User[], usersWithAccess: User[]) => void
) => {
  const response = await fetch(`${path}/rooms/${roomId}/users/${userId}`, {
    method: "DELETE",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  const { usersWithoutAccess, usersWithAccess } = data;
  if (onDeletedUser) {
    onDeletedUser(usersWithoutAccess, usersWithAccess);
  }
};

export const deleteUserAccount = async (
  userId: string,
  onDeletedAccount: (data: string, error: any) => void
) => {
  const response = await fetch(`${path}/users/${userId}`, {
    method: "DELETE",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data, error } = await response.json();
  onDeletedAccount(data, error);
};

export const postAccessToken = async (
  body: string,
  onTokenVerified: (data: User, error: any) => void
) => {
  const response = await fetch(`${path}/login`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data, error } = await response.json();
  onTokenVerified(data, error);
};

export const postNewRoom = async (
  body: string,
  onPostedRoom: (data: Room, error: any) => void
) => {
  const response = await fetch(`${path}/rooms`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data, error } = await response.json();
  onPostedRoom(data, error);
};

export const updateUserById = async (
  body: string,
  onUserUpdated: (updatedUser: User, error: any) => void
) => {
  const response = await fetch(`${path}/users/update`, {
    method: "PUT",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data, error } = await response.json();
  onUserUpdated(data, error);
};

export const getMessagesByRoomId = async (
  roomId: string,
  onFetchedMessages: (messages: ChatMessage[], error: any) => void
) => {
  const response = await fetch(`${path}/rooms/${roomId}/messages`);
  const { data, error } = await response.json();
  onFetchedMessages(data, error);
};

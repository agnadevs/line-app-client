import { User } from "./types";

export const getPrivateRoomUsers = (
  usersWithAcces: User[],
  activeUsers: User[]
) => {
  return usersWithAcces
    .map((user: User) => {
      return {
        ...user,
        isActive: !!activeUsers.find(
          (activeUser: User) => activeUser.userId === user.userId
        ),
      };
    })
    .sort((a, b) => (a.isActive ? -1 : 1));
};

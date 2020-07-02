import React from "react";
import { User, Room } from "../../../types";
import { UserList } from "./UserList";
import { DesktopMenu } from "./DesktopMenu";

type Props = {
  activeUsers: User[];
  currentRoom: Room;
};

export const UserMenu: React.FC<Props> = ({ activeUsers, currentRoom }) => {
  const isPrivateRoom = currentRoom.isPrivate;
  return (
    <DesktopMenu title="USERS" type="users">
      <UserList
        activeUsers={activeUsers}
        isPrivateRoom={isPrivateRoom}
        roomId={currentRoom.roomId}
      />
    </DesktopMenu>
  );
};

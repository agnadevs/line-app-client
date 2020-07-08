import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Room, User } from "../../../types";
import { useParams } from "react-router-dom";
import { getUsersByRoomId } from "../../../api";
import { getPrivateRoomUsers } from "../../../helpers";

const Title = styled.h2`
  position: absolute;
  top: 50%;
  left: 0;
  transform: rotate(-270deg);
`;

const Ul = styled.ul<{ desktop: boolean }>`
  max-height: ${(props) => (props.desktop ? "auto" : "200px")};
  padding: 20px 20px 20px 50px;
  overflow: scroll;
`;

const PublicUser = styled.li`
  padding-bottom: 30px;
  list-style-type: none;
`;

const PrivateUser = styled.li<IsActive>`
  padding-bottom: 30px;
  list-style-type: none;
  color: ${(props) => (props.isActive ? "#33cc00" : "lightgray")};
`;

type IsActive = {
  isActive: boolean;
};

type MappedUser = {
  userName: string;
  userId: string;
  createdAt: string;
  socketId: string;
  isActive: boolean;
};

type Props = {
  activeUsers: User[];
  currentRoom: Room;
  title?: string;
};

export const UserMenu: React.FC<Props> = ({
  currentRoom,
  activeUsers,
  title,
}) => {
  const [usersWithAccess, setUsersWithAccess] = useState<User[]>([]);
  const [privateUsersList, setPrivateUsersList] = useState<MappedUser[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { roomId } = useParams();
  const isPrivateRoom = currentRoom.isPrivate;

  const onFetchComplete = (
    usersWithoutAccess: User[],
    usersWithAccess: User[]
  ) => {
    setUsersWithAccess(usersWithAccess);
    setIsFetching(false);
  };

  useEffect(() => {
    if (isPrivateRoom) {
      setIsFetching(true);
      getUsersByRoomId(roomId, onFetchComplete);
    }
  }, [isPrivateRoom, roomId]);

  useEffect(() => {
    const privateRoomUsers = getPrivateRoomUsers(usersWithAccess, activeUsers);
    setPrivateUsersList(privateRoomUsers);
  }, [usersWithAccess, activeUsers]);

  if (isFetching) return null;

  return (
    <>
      {title && <Title>Users</Title>}
      <Ul desktop={!!title}>
        {!isPrivateRoom
          ? activeUsers.map((user: User) => {
              return <PublicUser key={user.userId}>{user.userName}</PublicUser>;
            })
          : privateUsersList.map((user: MappedUser) => {
              return (
                <PrivateUser key={user.userId} isActive={user.isActive}>
                  {user.userName}
                </PrivateUser>
              );
            })}
      </Ul>
    </>
  );
};

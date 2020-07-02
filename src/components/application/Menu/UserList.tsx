import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { User } from "../../../types";
import { getUsersByRoomId } from "../../../api";

const List = styled.ul`
  position: absolute;
  top: 10%;
  /* -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%); */
  font-weight: 100;
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

type Props = {
  activeUsers: User[];
  isPrivateRoom: boolean;
  roomId: number;
};

type MappedUser = {
  userName: string;
  userId: string;
  createdAt: string;
  socketId: string;
  isActive: boolean;
};

export const UserList: React.FC<Props> = ({
  activeUsers,
  isPrivateRoom,
  roomId,
}) => {
  const [usersWithAccess, setUsersWithAccess] = useState<User[]>([]);
  const [privateUsersList, setPrivateUsersList] = useState<MappedUser[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
    const privateRoomUsers = usersWithAccess
      .map((user: User) => {
        return {
          ...user,
          isActive: !!activeUsers.find(
            (activeUser: User) => activeUser.userId === user.userId
          ),
        };
      })
      .sort((a, b) => (a.isActive ? -1 : 1));
    console.log(privateRoomUsers);
    setPrivateUsersList(privateRoomUsers);
  }, [usersWithAccess, activeUsers]);

  if (isFetching) return null;

  return (
    <List>
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
    </List>
  );
};

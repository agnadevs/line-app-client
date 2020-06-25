import React from "react";
import styled from "styled-components";
import { User } from "../../types";

const UserList = styled.ul`
  position: absolute;
  top: 10%;
  /* -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%); */
  font-weight: 100;
`;

const ListItem = styled.li`
  padding-bottom: 30px;
  list-style-type: none;
`;

type Props = {
  users: User[];
  isPrivateRoom: boolean;
};

export const ChatMenuUserList: React.FC<Props> = ({ users, isPrivateRoom }) => {
  const userList = isPrivateRoom ? users : users;

  return (
    <UserList>
      {isPrivateRoom
        ? userList.map((user: User, index) => {
            return <ListItem key={index}>{user.userName}</ListItem>;
          })
        : null}
    </UserList>
  );
};

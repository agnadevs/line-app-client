import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { RoomsContext } from "../../../state/roomsContext";
import { UserContext } from "../../../state/userContext";
import { Modal } from "./Modal";
import { InfoBox } from "../InfoBox";
import { Button } from "../Button";
import { Input } from "../Input";
import { User } from "../../../types";

const Ul = styled.ul`
  border: 2px solid black;
  margin-bottom: 10px;
  padding: 10px;
`;

type Props = {
  modal: {
    open: boolean;
    modalName: string;
    closeModalCallback: () => void;
  };
};

// type Info = {
//   text: string;
//   isError: boolean;
// };

export const InviteUser: React.FC<Props> = ({ modal }) => {
  const { open, modalName, closeModalCallback } = modal;

  const [users, setUsers] = useState<User[]>([]);
  const [usersWithAccess, setUsersWithAccess] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((res) => setUsers(res.data));
  }, []);

  const removeFromUsers = async (selectedUser: User) => {
    return new Promise((resolve, reject) => {
      const filteredUsers = users.filter((user: User) => {
        return user.userId !== selectedUser.userId;
      });
      setUsers(filteredUsers);
      resolve(users);
    });
  };
  const addUser = async (selectedUser: User) => {
    await removeFromUsers(selectedUser);
    setUsersWithAccess((users) => [...users, selectedUser]);
  };

  return (
    <Modal
      open={open}
      modalName={modalName}
      closeModalCallback={closeModalCallback}
    >
      <div>
        {!!usersWithAccess.length && (
          <Ul>
            {usersWithAccess.map((user: User) => {
              return <li key={user.userId}>{user.userName}</li>;
            })}
          </Ul>
        )}

        {!!users.length && (
          <Ul>
            {users.map((user: User) => {
              return (
                <li onClick={() => addUser(user)} key={user.userId}>
                  {user.userName}
                </li>
              );
            })}
          </Ul>
        )}
      </div>
    </Modal>
  );
};

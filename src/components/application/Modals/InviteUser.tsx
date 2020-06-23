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

  const [usersWithoutAccess, setUsersWithoutAccess] = useState<User[]>([]);
  const [usersWithAccess, setUsersWithAccess] = useState<User[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/rooms/12/users`)
      .then((res) => res.json())
      .then((res) => {
        setUsersWithoutAccess(res.data.usersWithoutAccess);
        setUsersWithAccess(res.data.usersWithAccess);
      });
  }, []);

  const removeFromUsersWithoutAccess = async (selectedUser: User) => {
    return new Promise((resolve, reject) => {
      const filteredUsers = usersWithoutAccess.filter((user: User) => {
        return user.userId !== selectedUser.userId;
      });
      setUsersWithoutAccess(filteredUsers);
      resolve(usersWithoutAccess);
    });
  };
  const addToUsersWithAccess = async (selectedUser: User) => {
    await removeFromUsersWithoutAccess(selectedUser);
    setUsersWithAccess((usersWithAccess) => [...usersWithAccess, selectedUser]);
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

        {!!usersWithoutAccess.length && (
          <Ul>
            {usersWithoutAccess.map((user: User) => {
              return (
                <li
                  onClick={() => addToUsersWithAccess(user)}
                  key={user.userId}
                >
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

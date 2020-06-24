import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { InfoBox } from "./InfoBox";
import { Button } from "./Button";
import { Input } from "./Input";
import { User } from "../../types";

const Ul = styled.ul`
  background-color: #caffb9;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 5px;
  text-align: center;
  line-height: 40px;
  li {
    position: relative;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin: 20px 0px 20px 0px;
`;

const UsersWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const Header = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subheader = styled.h3`
  font-size: 0.9rem;
`;

const Icon = styled.i`
  position: absolute;
  right: 25%;
  top: 10px;
`;

type Props = {
  roomId: number | null;
};

export const InviteUser: React.FC<Props> = ({ roomId }) => {
  const [usersWithoutAccess, setUsersWithoutAccess] = useState<User[]>([]);
  const [usersWithAccess, setUsersWithAccess] = useState<User[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/rooms/${roomId}/users`)
      .then((res) => res.json())
      .then((res) => {
        setUsersWithoutAccess(res.data.usersWithoutAccess);
        setUsersWithAccess(res.data.usersWithAccess);
      });
  }, []);

  // const removeFromUsersWithoutAccess = async (selectedUser: User) => {
  //   return new Promise((resolve, reject) => {
  //     const filteredUsers = usersWithoutAccess.filter((user: User) => {
  //       return user.userId !== selectedUser.userId;
  //     });
  //     setUsersWithoutAccess(filteredUsers);
  //     resolve(usersWithoutAccess);
  //   });
  // };

  const addToUsersWithAccess = async (selectedUser: User) => {
    // await removeFromUsersWithoutAccess(selectedUser);
    fetch(
      `http://localhost:4000/api/rooms/${roomId}/users/${selectedUser.userId}`,
      {
        method: "POST",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        // setUsersWithoutAccess(res.data.usersWithoutAccess);
        // setUsersWithAccess(res.data.usersWithAccess);
      });

    setUsersWithAccess((usersWithAccess) => [...usersWithAccess, selectedUser]);
  };

  const removeFromUsersWithAccess = async (selectedUser: User) => {
    console.log(selectedUser);
  };

  return (
    <Wrapper>
      <Header>INVITE USERS TO ROOM</Header>
      <UsersWrapper>
        <Subheader>Users in room</Subheader>
        <Subheader>Users without access</Subheader>
        {!!usersWithAccess.length && (
          <Ul>
            {usersWithAccess.map((user: User) => {
              return (
                <li
                  key={user.userId}
                  onClick={() => removeFromUsersWithAccess(user)}
                >
                  {user.userName}
                  <Icon className="fas fa-minus fa-sm"></Icon>
                </li>
              );
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
                  <Icon className="fas fa-plus fa-sm"></Icon>
                </li>
              );
            })}
          </Ul>
        )}
      </UsersWrapper>
    </Wrapper>
  );
};

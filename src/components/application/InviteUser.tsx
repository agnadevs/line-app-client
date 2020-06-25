import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { User } from "../../types";
import { UserContext } from "../../state/userContext";

const Ul = styled.ul`
  background-color: #caffb9;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 5px;
  text-align: center;
  line-height: 40px;
  li {
    position: relative;
    :hover {
      cursor: pointer;
    }
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

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4000/api/rooms/${roomId}/users`)
      .then((res) => res.json())
      .then((res) => {
        setUsersWithoutAccess(res.data.usersWithoutAccess);
        setUsersWithAccess(res.data.usersWithAccess);
      });
  }, [roomId]);

  const addToUsersWithAccess = async (userId: string) => {
    fetch(`http://localhost:4000/api/rooms/${roomId}/users/${userId}`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsersWithoutAccess(res.data.usersWithoutAccess);
        setUsersWithAccess(res.data.usersWithAccess);
      });
  };

  const removeFromUsersWithAccess = async (userId: string) => {
    if (userId === user.userId) {
      return;
    }
    fetch(`http://localhost:4000/api/rooms/${roomId}/users/${userId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsersWithoutAccess(res.data.usersWithoutAccess);
        setUsersWithAccess(res.data.usersWithAccess);
      });
  };

  return (
    <Wrapper>
      <Header>INVITE USERS TO ROOM</Header>
      <UsersWrapper>
        <Subheader>Users in room</Subheader>
        <Subheader>Users without access</Subheader>
        {!!usersWithAccess.length && (
          <Ul>
            {usersWithAccess.map((u: User) => {
              const name =
                user.userId === u.userId
                  ? `${u.userName} ( admin ) `
                  : u.userName;
              return (
                <li
                  key={u.userId}
                  onClick={() => removeFromUsersWithAccess(u.userId)}
                >
                  {name} <Icon className="fas fa-minus fa-sm"></Icon>
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
                  onClick={() => addToUsersWithAccess(user.userId)}
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

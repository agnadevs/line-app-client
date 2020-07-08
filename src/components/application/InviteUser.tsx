import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { User } from "../../types";
import { UserContext } from "../../state/userContext";
import {
  getUsersByRoomId,
  postUserWithAccess,
  deleteUserWithAccess,
} from "../../api";

const Ul = styled.ul`
  background-color: #caffb9;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 5px;
  text-align: center;
  line-height: 40px;
  max-height: 300px;
  overflow: scroll;
`;

const Li = styled.li<{ isAdmin: boolean }>`
  position: relative;
  :hover {
    cursor: ${(props) => (props.isAdmin ? "not-allowed" : "pointer")};
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
    getUsersByRoomId(roomId, onFetchComplete);
  }, [roomId]);

  const onFetchComplete = (
    usersWithoutAccess: User[],
    usersWithAccess: User[]
  ) => {
    setUsersWithoutAccess(usersWithoutAccess);
    setUsersWithAccess(usersWithAccess);
  };

  const addToUsersWithAccess = async (userId: string) => {
    postUserWithAccess(roomId, userId, onFetchComplete);
  };

  const removeFromUsersWithAccess = async (userId: string) => {
    if (userId === user.userId) {
      return;
    }
    deleteUserWithAccess(roomId, userId, onFetchComplete);
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
              const adminColor = user.userId === u.userId ? "0.4" : "1";
              return (
                <>
                  <Li
                    key={u.userId}
                    onClick={() => removeFromUsersWithAccess(u.userId)}
                    style={{
                      opacity: adminColor,
                    }}
                    isAdmin={user.userId === u.userId}
                  >
                    {u.userName}
                  </Li>
                </>
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
                </li>
              );
            })}
          </Ul>
        )}
      </UsersWrapper>
    </Wrapper>
  );
};

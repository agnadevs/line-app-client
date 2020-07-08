import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { RoomsContext } from "../../state/roomsContext";
import { UserContext } from "../../state/userContext";
import { deleteUserWithAccess, getRoomsByUserId } from "../../api";
import { Room } from "../../types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
  margin: 20px 0px 20px 0px;
`;

const Header = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

type Props = {
  roomId: number | null;
  closeModalCb: () => void;
};

export const LeaveRoom: React.FC<Props> = ({ roomId, closeModalCb }) => {
  const { getRoomById, setInitialRooms } = useContext(RoomsContext);
  const { user } = useContext(UserContext);

  const currentRoom = getRoomById(roomId!);

  if (!currentRoom) return null;

  const onFetchComplete = (rooms: Room[]) => {
    setInitialRooms(rooms);
    closeModalCb();
  };

  const leaveRoom = async (userId: string) => {
    await deleteUserWithAccess(roomId, userId);
    getRoomsByUserId(userId, onFetchComplete);
  };

  return (
    <Wrapper>
      <Header>{`Do you want to leave ${currentRoom.title}?`}</Header>
      <Button title="Leave room" onClick={() => leaveRoom(user.userId)} />
    </Wrapper>
  );
};

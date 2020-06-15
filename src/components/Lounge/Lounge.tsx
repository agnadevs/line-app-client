import React, { useContext, useEffect, useState } from "react";
import { RoomCard } from "./RoomCard";
import styled from "styled-components";
import { checkAndSetUserContext } from "../../user";
import { store } from "../../state/store";
import { roomsContext } from "../../state/roomsContext";
import { Room } from "../../types";
import { PageHeader } from "../Application/PageHeader";
import { Modal } from "../Application/Modal";
import { EditUser } from "../Application/EditUser";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 50px auto;
  padding: 20px;
`;

type MyUser = {
  userName: string;
  userId: string;
  color: string;
};

export default () => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<MyUser | null>(null);

  const { state, dispatch } = useContext(store);
  const { roomsState } = useContext(roomsContext);
  const { rooms } = roomsState;

  useEffect(() => {
    checkAndSetUserContext(state.user, dispatch);
    setUser(state.user);
  }, [state.user, dispatch]);

  if (!rooms || !user) return null;

  return (
    <>
      <Modal open={openModal} closeModalCallback={() => setOpenModal(false)}>
        <EditUser userName={user.userName} />
      </Modal>
      <PageHeader
        userName={user.userName}
        editUserCallback={() => setOpenModal(true)}
      />
      <MenuWrapper>
        {rooms.map((room: Room, index) => {
          return (
            <RoomCard
              key={index}
              title={room.title}
              infoText={room.infoText}
              onClick={() => console.log(room.title)}
              path={room.path}
            />
          );
        })}
      </MenuWrapper>
    </>
  );
};

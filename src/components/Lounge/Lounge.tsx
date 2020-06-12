import React, { useContext, useEffect, useState } from "react";
import { RoomCard } from "./RoomCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { checkAndSetUserContext } from "../../user";
import { store } from "../../state/store";
import { roomsContext } from "../../state/roomsContext";
import { Room } from "../../types";
import { PageHeader } from "../Application/PageHeader";
import { Modal } from "../Application/Modal";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 50px auto;
  padding: 20px;
`;

export default () => {
  const [openModal, setOpenModal] = useState(false);

  const { state, dispatch } = useContext(store);
  const { roomsState } = useContext(roomsContext);
  const { rooms } = roomsState;

  useEffect(() => {
    checkAndSetUserContext(state.user, dispatch);
    console.log(state.user);
    console.log("useEffect");
  }, [state.user, dispatch]);

  if (!rooms) return null;
  console.log(state.user);

  return (
    <>
      <Modal open={openModal} closeModalCallback={() => setOpenModal(false)} />
      <PageHeader userName={state.user.userName} />
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

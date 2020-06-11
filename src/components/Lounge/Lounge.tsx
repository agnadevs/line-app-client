import React, { useContext, useEffect } from "react";
import { RoomCard } from "./RoomCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { checkAndSetUserContext } from "../../user";
import { store } from "../../state/store";
import { roomsContext } from "../../state/roomsContext";
import { Room } from "../../types";
import { PageHeader } from "../Application/PageHeader";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 50px auto;
  padding: 20px;
`;

export default () => {
  const { state, dispatch } = useContext(store);
  const { roomsState } = useContext(roomsContext);
  const { rooms } = roomsState;

  useEffect(() => {
    checkAndSetUserContext(state.user, dispatch);
  }, []);

  if (!rooms) return null;

  return (
    <>
      <PageHeader />
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

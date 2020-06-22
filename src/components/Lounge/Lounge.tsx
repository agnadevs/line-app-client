import React, { useContext, useEffect, useState } from "react";
import { RoomCard } from "./RoomCard";
import { NewRoom } from "./NewRoom";
import styled from "styled-components";
import { checkAndSetUserContext } from "../../user";
import { UserContext } from "../../state/userContext";
import { RoomsContext } from "../../state/roomsContext";
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

export default () => {
  const [openModal, setOpenModal] = useState(false);
  const { user, addUser } = useContext(UserContext);
  const { rooms, setInitialRooms } = useContext(RoomsContext);

  useEffect(() => {
    checkAndSetUserContext(user, addUser);
  }, [user, addUser]);

  useEffect(() => {
   if (user.userId !== ""){ 
     if (rooms.length === 0) {
      fetch(`http://localhost:4000/api/rooms/user/${user.userId}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          setInitialRooms(res.data);
        });
    }
  }
  }, [setInitialRooms, rooms.length, user]);

  if (rooms.length === 0 || !user.userName) return null;

  return (
    <>
      {openModal && (
        <Modal
          open={openModal}
          modalName="MY PROFILE"
          closeModalCallback={() => setOpenModal(false)}
        >
          <EditUser
            userName={user.userName}
            userId={user.userId}
            profileImageURL={user.profileImageURL}
          />
        </Modal>
      )}
      <PageHeader
        userName={user.userName}
        profileImageURL={user.profileImageURL}
        editUserCallback={() => setOpenModal(true)}
      />
      <NewRoom />
      <MenuWrapper>
        {rooms &&
          rooms.map((room: Room, index) => {
            return (
              <RoomCard key={index} title={room.title} roomId={room.roomId} />
            );
          })}
      </MenuWrapper>
    </>
  );
};

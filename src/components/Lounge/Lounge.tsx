import React, { useContext, useEffect, useState } from "react";
import { RoomCard } from "./RoomCard";
import styled from "styled-components";
import { checkAndSetUserContext } from "../../user";
import { UserContext } from "../../state/userContext";
import { RoomsContext } from "../../state/roomsContext";
import { Room } from "../../types";
import { PageHeader } from "../Application/PageHeader";
import { EditUser } from "../Application/Modals/EditUser";
import { CreateRoom } from "../Application/Modals/CreateRoom";
import { Button } from "../Application/Button";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px auto;
  padding: 20px;
`;

const PrivateContainer = styled.div`
  background-color: #fafded;
  width: 90%;
  margin: 0 auto;
  border-radius: 4px;
  opacity: 0.7;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const SectionTitle = styled.h2<Props>`
  text-align: center;
  color: ${(props) => (props.private ? "black" : "#fafded")};
  font-size: 2rem;
  letter-spacing: 2px;
  margin-top: 20px;
  padding-top: 20px;
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  padding: 10px;
`;
const Subtext = styled.p`
  font-size: 0.9rem;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 50px;
`;
const StyledButton = styled(Button)`
  margin: 20px;
`;

type Props = {
  private?: boolean;
};

export default () => {
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [openRequestRoomAccess, setOpenRequestRoomAccess] = useState(false);
  const { user, addUser } = useContext(UserContext);
  const { rooms, setInitialRooms } = useContext(RoomsContext);

  useEffect(() => {
    checkAndSetUserContext(user, addUser);
  }, [user, addUser]);

  useEffect(() => {
    if (user.userId !== "") {
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

  const publicRooms = rooms.filter((room: Room) => !room.isPrivate);
  const privateRooms = rooms.filter((room: Room) => room.isPrivate);

  const editUserModalProps = {
    open: openEditUser,
    modalName: "MY PROFILE",
    closeModalCallback: () => setOpenEditUser(false),
  };

  const createRoomModalProps = {
    open: openCreateRoom,
    modalName: "CREATE PRIVATE ROOM",
    closeModalCallback: () => setOpenCreateRoom(false),
  };
  return (
    <>
      {openEditUser && <EditUser modal={editUserModalProps} />}
      {openCreateRoom && <CreateRoom modal={createRoomModalProps} />}
      <PageHeader
        userName={user.userName}
        profileImageURL={user.profileImageURL}
        editUserCallback={() => setOpenEditUser(true)}
      />
      <SectionTitle>PUBLIC ROOMS</SectionTitle>
      <MenuWrapper>
        {publicRooms &&
          publicRooms.map((room: Room, index) => {
            return (
              <RoomCard key={index} title={room.title} roomId={room.roomId} />
            );
          })}
      </MenuWrapper>
      <PrivateContainer>
        <SectionTitle private>YOUR ROOMS</SectionTitle>
        <MenuWrapper>
          {!!privateRooms.length ? (
            privateRooms.map((room: Room, index) => {
              return (
                <RoomCard key={index} title={room.title} roomId={room.roomId} />
              );
            })
          ) : (
            <InfoContainer>
              <Subtitle>
                You don't have access to any private rooms yet.
              </Subtitle>
              <Subtext>
                Create a private room below or request access to a private room
                through the search.
              </Subtext>
            </InfoContainer>
          )}
        </MenuWrapper>
      </PrivateContainer>
      <ButtonContainer>
        <StyledButton
          title="Create Room"
          disabled={false}
          onClick={() => setOpenCreateRoom(true)}
          standardBtn
        />
        <StyledButton
          title="Request Access"
          onClick={() => setOpenRequestRoomAccess(true)}
          standardBtn
        />
      </ButtonContainer>
    </>
  );
};

import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RoomsContext } from "../../state/roomsContext";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 125px;
  border-radius: 5px;
  background-color: #fafded;
  margin: 10px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 2rem;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "IBM Plex Mono", monospace;
  color: #0e0f19;
  text-align: center;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  right: 10px;
  top: 10px;
  color: black;
  padding: 10px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

type Props = {
  title: string;
  roomId: number;
  adminId?: number;
  isPrivate?: boolean;
  openPrivateRoomSettingsCallback?: (roomId: number, title: string) => void;
};

export const RoomCard: React.FC<Props> = ({
  title,
  roomId,
  adminId,
  openPrivateRoomSettingsCallback,
}) => {
  const { getRoomById } = useContext(RoomsContext);
  const currentRoom = getRoomById(roomId);

  if (!currentRoom) return null;

  const { isPrivate } = currentRoom;

  return (
    <Wrapper>
      {isPrivate ? (
        <Icon
          onClick={() =>
            openPrivateRoomSettingsCallback &&
            openPrivateRoomSettingsCallback(roomId, title)
          }
          className="fas fa-user-cog fa-md"
        ></Icon>
      ) : null}
      <StyledLink to={`/chat/${roomId}`}>
        <Box>
          <Title>{title.toUpperCase()}</Title>
        </Box>
      </StyledLink>
    </Wrapper>
  );
};

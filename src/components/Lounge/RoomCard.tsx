import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { InviteUser } from "../Application/InviteUser";

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
  width: 500px;
  height: 250px;
  border-radius: 5px;
  background-color: #fafded;
  margin: 10px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 50px;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "IBM Plex Mono", monospace;
  color: #0e0f19;
  margin-top: 100px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  right: 15px;
  top: 20px;
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
  isPrivate?: boolean;
  openPrivateRoomSettingsCallback?: (roomId: number, title: string) => void;
};

export const RoomCard: React.FC<Props> = ({
  title,
  roomId,
  isPrivate,
  openPrivateRoomSettingsCallback,
}) => {
  return (
    <Wrapper>
      {isPrivate ? (
        <Icon
          onClick={() =>
            openPrivateRoomSettingsCallback &&
            openPrivateRoomSettingsCallback(roomId, title)
          }
          className="fas fa-user-cog fa-lg"
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

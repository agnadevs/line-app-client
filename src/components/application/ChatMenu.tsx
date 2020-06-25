import React from "react";
import styled from "styled-components";
import { User, Room } from "../../types";
import { ChatMenuUserList } from "./ChatMenuUserList";

const MenuWrapper = styled.div`
  top: 0;
  font-weight: 100;
  background: #fafded;
  width: 130px;
  height: 100%;
  padding-left: 60px;
  position: fixed;
  z-index: 100;
  -webkit-box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  right: -130px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  color: #222;
  :hover,
  focus  {
    transform: translate3d(-130px, 0, 0);
    animation-timing-function: 1s ease-in;
  }
`;

const Title = styled.div`
  top: 50%;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  transform: rotate(270deg);
  left: 10px;
  font-weight: 800;
  font-size: 15px;
`;

type Props = {
  activeUsers: User[];
  currentRoom: Room;
};

export const ChatMenu: React.FC<Props> = ({ activeUsers, currentRoom }) => {
  const isPrivateRoom = currentRoom.isPrivate;
  return (
    <MenuWrapper>
      <Title>USERS</Title>
      <ChatMenuUserList
        activeUsers={activeUsers}
        isPrivateRoom={isPrivateRoom}
        roomId={currentRoom.roomId}
      />
    </MenuWrapper>
  );
};

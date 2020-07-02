import React, { useContext } from "react";
import styled from "styled-components";
import { RoomsList } from "./RoomsList";
import { UserList } from "./UserList";
import { RoomsContext } from "../../../state/roomsContext";
import { User, Room } from "../../../types";

const Toggler = styled.input`
  z-index: 2;
  height: 50px;
  width: 50px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  opacity: 0;
  :checked + .hamburger > div {
    background: rgba(0, 0, 0, 0);
  }
  :checked + .hamburger > div::before {
    top: 0;
    transform: rotate(45deg);
    background: black;
  }
  :checked + .hamburger > div::after {
    top: 0;
    transform: rotate(135deg);
    background: black;
  }
  :checked ~ .menu {
    width: 50%;
  }
  :checked ~ .menu > div > ul {
    transition: visibility 0.4s ease;
    transition-delay: 0.1s;
    visibility: visible;
  }
`;

const Hamburger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 40px;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    position: relative;
    top: 0;
    left: 0;
    background: white;
    height: 2px;
    width: 60%;
    transition: all 0.4s ease;
    ::before,
    ::after {
      content: "";
      position: absolute;
      top: -10px;
      background: white;
      width: 100%;
      height: 2px;
      transition: all 0.4s ease;
    }

    ::after {
      top: 10px;
    }
  }
`;

const Menu = styled.div`
  background: white;
  width: 0%;
  height: 100vh;
  transition: all 0.4s ease;
  position: fixed;
  > div > ul {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 70px;
    padding-left: 10px;
    visibility: hidden;
  }
  > div > ul > li {
    list-style: none;
    padding: 0.5rem;
  }
`;

type Props = {
  currentRoom: Room;
  activeUsers: User[];
};

export const MobileMenu: React.FC<Props> = ({ currentRoom, activeUsers }) => {
  const { rooms } = useContext(RoomsContext);
  const isPrivateRoom = currentRoom.isPrivate;
  return (
    <>
      <Toggler type="checkbox" />
      <Hamburger className="hamburger">
        <div></div>
      </Hamburger>
      <Menu className="menu">
        <div>
          <ul>
            <li>
              <RoomsList rooms={rooms} />
            </li>
            <li>
              <UserList
                activeUsers={activeUsers}
                isPrivateRoom={isPrivateRoom}
                roomId={currentRoom.roomId}
              />
            </li>
          </ul>
        </div>
      </Menu>
    </>
  );
};

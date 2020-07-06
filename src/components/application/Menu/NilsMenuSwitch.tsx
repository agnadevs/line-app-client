import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NilsRoomsMenu } from "./NilsRoomsMenu";
import { NilsUserMenu } from "./NilsUserMenu";
import { User, Room } from "../../../types";
import { RoomsContext } from "../../../state/roomsContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MenuBase = styled.div`
  display: flex;
  background-color: #fafded;
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  transition: 0.3s;
  & > hr {
    width: 90%;
  }
`;

const RoomMenu = styled(MenuBase)`
  left: 0;
  transform: translateX(-150px);
  :hover  {
    transform: translateX(0px);
  }
`;

const UserMenu = styled(MenuBase)`
  right: 0;
  transform: translateX(150px);
  :hover  {
    transform: translateX(0px);
  }
`;

const MobileMenu = styled(MenuBase)<{ open: boolean }>`
  padding-top: 40px;
  flex-direction: column;
  left: 0;
  transform: ${(props) =>
    props.open ? "translateX(0px)" : "translateX(-200px)"};
  & div > ul {
    padding: 20px 50px 20px 20px;
  }
`;

const HamburgerIcon = styled.i<{ open: boolean }>`
  color: ${(props) => (props.open ? "black" : "#fafded")};
  position: absolute;
  top: 10px;
  left: 215px;
  transform: ${(props) =>
    props.open ? "translateX(-50px)" : "translateX(0px)"};
  transition: 0.3s;
`;

const MenuSection = styled.div`
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 20px;
`;

const ListItem = styled.li`
  padding-bottom: 30px;
  list-style-type: none;
  & > a {
    font-weight: "bold";
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  :hover {
    color: #aaa;
  }
`;

type Props = {
  currentRoom: Room;
  activeUsers: User[];
};

export const NilsMenuSwitch: React.FC<Props> = ({
  //   currentRoom,
  activeUsers,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);
  const [menuOpen, setMenuOpen] = useState(false);

  const { rooms, getRoomById } = useContext(RoomsContext);
  const { roomId } = useParams();

  const currentRoom = getRoomById(parseInt(roomId));

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 450);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      {isMobile ? (
        <MobileMenu open={menuOpen}>
          <HamburgerIcon
            className={menuOpen ? "fas fa-times fa-2x" : "fas fa-bars fa-2x"}
            onClick={() => setMenuOpen(!menuOpen)}
            open={menuOpen}
          />
          <MenuSection>
            <SectionTitle>Users</SectionTitle>
            <hr />
            <NilsUserMenu
              currentRoom={currentRoom!}
              activeUsers={activeUsers}
            />
          </MenuSection>
          <MenuSection>
            <SectionTitle>Rooms</SectionTitle>
            <hr />
            <NilsRoomsMenu rooms={rooms} />
          </MenuSection>
        </MobileMenu>
      ) : (
        <>
          <RoomMenu>
            <NilsRoomsMenu title="Rooms" rooms={rooms} />
          </RoomMenu>
          <UserMenu>
            <NilsUserMenu
              currentRoom={currentRoom!}
              activeUsers={activeUsers}
              title="Users"
            />
          </UserMenu>
        </>
      )}
    </>
  );
};

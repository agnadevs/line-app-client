import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { Room } from "../../types";
import { roomsContext } from "../../state/roomsContext";
import { ReactComponent as BackIcon } from "../../assets/back-caret.svg";

const MenuWrapper = styled.div`
  top: 0;
  font-weight: 100;
  background: #fafded;
  width: 150px;
  height: 100%;
  padding-right: 50px;
  position: fixed;
  z-index: 100;
  -webkit-box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  left: -130px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  color: #222;
  :hover,
  focus  {
    transform: translate3d(130px, 0, 0);
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
  transform: rotate(-270deg);
  right: 10px;
  font-weight: 800;
  font-size: 15px;
`;
const UserList = styled.ul`
  position: absolute;
  top: 50%;
  left: 20%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-weight: 100;
`;

const ListItem = styled.li`
  padding-bottom: 30px;
  list-style-type: none;
`;

const StyledLink = styled(Link)<Props>`
  font-weight: ${(props: any) => (props.highlight ? "bold" : "normal")};
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
  highlight: boolean;
};

export const RoomsMenu: React.FC = () => {
  const { roomsState } = useContext(roomsContext);
  const { rooms } = roomsState;

  interface RouteParams {
    room: string;
  }
  const params = useParams<RouteParams>();

  if (!rooms) return null;

  return (
    <MenuWrapper>
      <Title>MENU</Title>
      <UserList>
        {rooms.map((room: Room, index) => {
          const isActiveRoom = params.room === room.title.toLowerCase();
          return (
            <ListItem key={index}>
              <StyledLink to={room.path} highlight={isActiveRoom}>
                {isActiveRoom ? room.title.toUpperCase() : room.title}
              </StyledLink>
            </ListItem>
          );
        })}
        <hr />
        <br />
        <ListItem>
          <StyledLink to="/" highlight={true}>
            <BackIcon />
            Lounge
          </StyledLink>
        </ListItem>
      </UserList>
    </MenuWrapper>
  );
};

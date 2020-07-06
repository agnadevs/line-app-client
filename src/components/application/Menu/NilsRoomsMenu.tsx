import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Room } from "../../../types";
import { ReactComponent as BackIcon } from "../../../assets/back-caret.svg";
import { useParams } from "react-router-dom";

const Menu = styled.div`
  display: flex;
  background-color: #fafded;
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.3s;
  transform: translateX(-150px);
  :hover  {
    transform: translateX(0px);
  }
`;

const Title = styled.h2`
  position: absolute;
  top: 50%;
  right: 0;
  transform: rotate(270deg);
`;

const Ul = styled.ul<{ desktop: boolean }>`
  padding: 20px 50px 20px 20px;
  align-self: center;
  overflow: scroll;
  height: ${(props) => (props.desktop ? "auto" : "200px")};
`;

const ListItem = styled.li<StyleProps>`
  padding-bottom: 30px;
  list-style-type: none;
  & > a {
    font-weight: ${(props) => (props.highlight ? "bold" : "normal")};
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

type StyleProps = {
  highlight?: boolean;
};

type Props = {
  rooms: Room[];
  title?: string;
};

export const NilsRoomsMenu: React.FC<Props> = ({ rooms, title }) => {
  const { roomId } = useParams();

  return (
    <>
      {title && <Title>Rooms</Title>}
      <Ul desktop={!!title}>
        {rooms &&
          rooms.map((room: Room, index) => {
            const isActiveRoom = Number(roomId) === room.roomId;
            return (
              <ListItem key={index} highlight={isActiveRoom}>
                <StyledLink to={`/chat/${room.roomId}`}>
                  {isActiveRoom ? room.title.toUpperCase() : room.title}
                </StyledLink>
              </ListItem>
            );
          })}
        <hr />
        &nbsp;
        <ListItem highlight={true}>
          <StyledLink to="/">
            <BackIcon style={{ marginRight: "5px" }} />
            Lounge
          </StyledLink>
        </ListItem>
      </Ul>
    </>
  );
};

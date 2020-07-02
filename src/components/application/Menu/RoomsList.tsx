import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { Room } from "../../../types";
import { ReactComponent as BackIcon } from "../../../assets/back-caret.svg";

const List = styled.ul`
  position: absolute;
  top: 50%;
  left: 10%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-weight: 100;
  width: 60%;
  display: none;
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
type Props = {
  rooms: Room[];
};

type StyleProps = {
  highlight?: boolean;
};

export const RoomsList: React.FC<Props> = ({ rooms }) => {
  type RouteParams = {
    roomId: string;
  };
  const params = useParams<RouteParams>();
  console.log(rooms);
  return (
    <List>
      {rooms &&
        rooms.map((room: Room, index) => {
          const isActiveRoom = Number(params.roomId) === room.roomId;
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
    </List>
  );
};

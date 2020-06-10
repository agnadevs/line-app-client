import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

export const RoomsMenu: React.FC = () => {
  return (
    <MenuWrapper>
      <Title>MENU</Title>
      <UserList>
        <ListItem>
          <StyledLink to="/chat/vue">Vue</StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/chat/react">React</StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/chat/angular">Angular</StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/chat/svelte">Svelte</StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/">Lounge</StyledLink>
        </ListItem>
      </UserList>
    </MenuWrapper>
  );
};

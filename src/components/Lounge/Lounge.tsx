import React, { useContext, useEffect } from "react";
import { RoomCard } from "./RoomCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { checkAndSetUserContext } from "../../user";
import { store } from "../../state/store";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 50px auto;
  width: 675px;
`;

const menuItems = [
  {
    title: "React",
    infoText: "This is a room about React",
    imageURL: "",
    path: "/chat/react",
  },
  {
    title: "Vue",
    infoText: "This is a room about Vue",
    imageURL: "",
    path: "/chat/vue",
  },
  {
    title: "Angular",
    infoText: "This is a room about Angular",
    imageURL: "",
    path: "/chat/angular",
  },
  {
    title: "Svelte",
    infoText: "This is a room about Svelte",
    imageURL: "",
    path: "/chat/svelte",
  },
];

export default () => {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    checkAndSetUserContext(state.user, dispatch);
  }, []);

  return (
    <MenuWrapper>
      {menuItems.map((item, index) => {
        return (
          <RoomCard
            key={index}
            title={item.title}
            infoText={item.infoText}
            onClick={() => console.log(item.title)}
            path={item.path}
          />
        );
      })}
    </MenuWrapper>
  );
};

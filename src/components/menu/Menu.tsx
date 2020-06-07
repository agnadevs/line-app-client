import React, { useContext, useEffect } from "react";
import { MenuItem } from "./MenuItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userContext } from "../../context";
import Cookies from "js-cookie";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px auto;
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
  const { setCurrentUser } = useContext(userContext);
  const user = Cookies.get("user");
  const colors: string[] = [
    "#d5dcf9",
    "#caffb9",
    "#a8ccc9",
    "#a4b8c4",
    "#daf7dc",
  ];
  useEffect(() => {
    if (user) {
      const parsedUser = JSON.parse(user);

      setCurrentUser({
        userName: parsedUser.userName,
        userId: parsedUser.userId,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, []);
  return (
    <MenuWrapper>
      {menuItems.map((item, index) => {
        return (
          <MenuItem
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

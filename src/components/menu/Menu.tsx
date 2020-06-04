import React from "react";
import { MenuItem } from "./MenuItem";
import styled from "styled-components";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;

const menuItems = [
  { title: "React", infoText: "This is a room about React", imageURL: "" },
  { title: "Vue", infoText: "This is a room about Vue", imageURL: "" },
  { title: "Angular", infoText: "This is a room about Angular", imageURL: "" },
  { title: "Svelte", infoText: "This is a room about Svelte", imageURL: "" },
];

export default () => {
  return (
    <MenuWrapper>
      {menuItems.map((item, index) => {
        return (
          <MenuItem
            key={index}
            title={item.title}
            infoText={item.infoText}
            onClick={() => console.log(item.title)}
          />
        );
      })}
    </MenuWrapper>
  );
};

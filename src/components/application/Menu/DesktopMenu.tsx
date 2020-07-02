import React from "react";
import styled from "styled-components";

const MenuWrapper = styled.div<Props>`
  top: 0;
  font-weight: 100;
  background: #fafded;
  width: 130px;
  height: 100%;
  padding-left: ${(props) => (props.type === "users" ? "60px" : "unset")};
  padding-right: ${(props) => (props.type === "rooms" ? "60px" : "unset")};
  position: fixed;
  z-index: 100;
  -webkit-box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  right: ${(props) => (props.type === "users" ? "-130px" : "unset")};
  left: ${(props) => (props.type === "rooms" ? "-130px" : "unset")};
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  color: #222;
  :hover,
  focus  {
    transform: ${(props) =>
      props.type === "users"
        ? "translate3d(-130px, 0, 0)"
        : "translate3d(130px, 0, 0)"};
    animation-timing-function: 1s ease-in;
    ul {
      display: block;
    }
  }
`;

const Title = styled.div<Props>`
  top: 50%;
  position: absolute;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  transform: ${(props) =>
    props.type === "users" ? "rotate(270deg)" : "rotate(-270deg)"};
  left: ${(props) => (props.type === "users" ? "10px" : "unset")};
  right: ${(props) => (props.type === "rooms" ? "10px" : "unset")};
  font-weight: 800;
  font-size: 15px;
`;

type Props = {
  title: string;
  type: string;
};

export const DesktopMenu: React.FC<Props> = (props) => {
  return (
    <MenuWrapper {...props}>
      <Title {...props}>{props.title}</Title>
      {props.children}
    </MenuWrapper>
  );
};

import React from "react";
import styled from "styled-components";
import Menu from "./components/menu/Menu";
import { Welcome } from "./components/Welcome";
import Cookies from "js-cookie";

const Wrapper = styled.div`
  position: relative;
  width: 1000px;
  margin: 0 auto;
  top: 100px;
`;

export default () => {
  return <Wrapper>{!!Cookies.get("user") ? <Menu /> : <Welcome />}</Wrapper>;
};

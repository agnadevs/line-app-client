import React from "react";
import styled from "styled-components";
//import { Chat } from "./components/Chat";
import { Welcome } from "./components/Welcome";

const Wrapper = styled.div`
  position: relative;
  width: 900px;
  margin: 0 auto;
top: 100px;
`;

export default () => {
  return (
    <Wrapper>
      <Welcome />
      {/* <Chat /> */}
    </Wrapper>
  );
};

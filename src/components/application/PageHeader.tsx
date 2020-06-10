import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 95%;
  height: 40%;
  color: #394648;
  margin: 0 auto;
  margin-right: 5px;
  background-color: #fafded;
`;

const Header = styled.h1`
  font-size: 30px;
  margin: 50px;
`;

export const PageHeader = () => {
  return (
    <Container>
      <Header>React Chatroom</Header>
    </Container>
  );
};

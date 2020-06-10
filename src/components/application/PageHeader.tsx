import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 50px;
  color: #394648;
  margin: 0 auto;
  background-color: #fafded;
`;

const Header = styled.h1`
  font-size: 30px;
  margin: 50px;
`;

type Props = {
  roomName: string;
};
export const PageHeader: React.FC<Props> = ({ roomName }) => {
  return (
    <Container>
      <Header>{roomName}</Header>
    </Container>
  );
};

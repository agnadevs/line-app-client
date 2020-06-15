import React from "react";
import styled from "styled-components";
import LoginBtn from "./LoginBtn";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
  height: auto;
  margin: 0 auto;
  background-color: #fafded;
`;

const Logo = styled.img`
  width: 25%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 50px;
  padding-right: 20px;
`;

const Name = styled.span`
  font-size: 18px;
  margin-left: 10px;
`;

const Image = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #d5dcf9;
`;

type Props = {
  userName: string;
  editUserCallback: () => void;
};
export const PageHeader: React.FC<Props> = ({ userName, editUserCallback }) => {
  return (
    <Container>
      <Logo src="/logo.png" alt="logo" />
      <RightContainer onClick={editUserCallback}>
        <User>
          <Image></Image>
          <Name>{userName}</Name>
        </User>
        <LoginBtn />
      </RightContainer>
    </Container>
  );
};

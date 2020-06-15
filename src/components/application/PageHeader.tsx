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
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 50px;
  padding-right: 20px;
  :hover {
    cursor: pointer;
  }
`;

const Name = styled.span`
  font-size: 16px;
  margin-left: 10px;
`;

const Image = styled.div<Props>`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #d5dcf9;
  background-image: ${(props) =>
    props.profileImageURL && `url(${props.profileImageURL})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

type Props = {
  userName: string;
  profileImageURL: string;
  editUserCallback: () => void;
};
export const PageHeader: React.FC<Props> = (props) => {
  return (
    <Container>
      <Logo src="/logo.png" alt="logo" />
      <RightContainer>
        <User onClick={props.editUserCallback}>
          <Image {...props}></Image>
          <Name>{props.userName}</Name>
        </User>
        <LoginBtn />
      </RightContainer>
    </Container>
  );
};

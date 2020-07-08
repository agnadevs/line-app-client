import React from "react";
import styled from "styled-components";
import LoginBtn from "./Application/LoginBtn";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
`;

const Logo = styled.img`
  width: 50%;
  margin: 50px auto;
  @media only screen and (max-width: 450px) {
    width: 75%;
  }
`;

export const Login: React.FC = () => {
  return (
    <WelcomeContainer>
      <Logo src="/logo_light.png" alt="logo" />
      <LoginBtn />
    </WelcomeContainer>
  );
};

import React from "react";
import styled from "styled-components";
import LoginBtn from "./Application/LoginBtn";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 70px;
`;

const Logo = styled.img`
  width: 50%;
  margin: 10px 20px;
`;

export const Login: React.FC = () => {
  return (
    <WelcomeContainer>
      <Logo src="/logo_light.png" alt="logo" />
      <LoginBtn />
    </WelcomeContainer>
  );
};

import React from "react";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    transform: translateY(-30px);
    opacity: 0;
    height: 0;
  }
  5% {
    transform: translateY(0);
    opacity: 1;
    height: 30px;
  }
  50%{
    transform: translateY(0);
    opacity: 1;
    height: 30px;
  }
  95%{
    transform: translateY(0);
    opacity: 1;
    height: 30px;
  }
  100% {
    transform: translateY(-30px);
    opacity: 0;
    height: 0px;
  }
`;

const Container = styled.div<Props>`
  animation: ${slideDown} 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  display: flex;
  align-self: center;
  background-color: ${(props) => (props.isError ? "#FD9187" : "#caffb9")};
  color: ${(props) => (props.isError ? "#FC594A" : "#33cc00")};
  min-width: 300px;
  height: 40px;
  border-radius: 4px;
`;

const Message = styled.span`
  font-size: 14px;
  margin: 0 auto;
  padding: 10px;
`;

type Props = {
  text: string;
  isError: boolean;
};

export const InfoBox: React.FC<Props> = (props) => {
  return (
    <Container {...props}>
      <Message>{props.text}</Message>
    </Container>
  );
};

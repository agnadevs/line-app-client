import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 300px;
  height: 250px;
  border-radius: 5px;
  background-color: #fafded;
  margin-bottom: 20px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 35px;
  letter-spacing: 0.9px;
  font-weight: bold;
  color: #0e0f19;
  margin: 20px 0px;
`;

const Info = styled.p`
  color: #0e0f19;
  padding: 10px;
`;

const Image = styled.img``;

type Props = {
  title: string;
  infoText: string;
  imgURL?: string;
  onClick: () => void;
  path: string;
};
export const MenuItem: React.FC<Props> = ({
  title,
  infoText,
  imgURL,
  onClick,
  path,
}) => {
  return (
    <>
      <StyledLink to={path}>
        <Box onClick={onClick}>
          <Title>{title}</Title>
          <Info>{infoText}</Info>
          <Image src={imgURL}></Image>
        </Box>
      </StyledLink>
    </>
  );
};

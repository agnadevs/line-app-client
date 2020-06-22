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
  width: 500px;
  height: 250px;
  border-radius: 5px;
  background-color: #fafded;
  margin: 10px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 50px;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "IBM Plex Mono", monospace;
  color: #0e0f19;
  margin-top: 100px;
`;

type Props = {
  title: string;
  roomId: number;
};

export const RoomCard: React.FC<Props> = ({ title, roomId }) => {
  return (
    <>
      <StyledLink to={`/chat/${roomId}`}>
        <Box>
          <Title>{title.toUpperCase()}</Title>
        </Box>
      </StyledLink>
    </>
  );
};

import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 300px;
  height: 250px;
  border-radius: 5px;
  background-color: #0b0637;
  margin-bottom: 20px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
`;

const Info = styled.p`
  color: white;
  padding: 10px;
`;

const Image = styled.img``;

type Props = {
  title: string;
  infoText: string;
  imgURL?: string;
  onClick: () => void;
};
export const MenuItem: React.FC<Props> = ({
  title,
  infoText,
  imgURL,
  onClick,
}) => {
  return (
    <>
      <Box onClick={onClick}>
        <Title>{title}</Title>
        <Info>{infoText}</Info>
        <Image src={imgURL}></Image>
      </Box>
    </>
  );
};

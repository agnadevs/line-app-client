import React from "react";
import styled from "styled-components";

const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isError ? "#FD9187" : "#C8E5E0")};
  width: 400px;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Message = styled.span`
  font-size: 14px;
  margin: 0 auto;
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

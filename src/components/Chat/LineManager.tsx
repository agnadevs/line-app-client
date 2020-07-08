import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  margin: 15px auto;
  border: none;
  border-radius: 10px;
  background-color: #fafded;
  padding: 10px;
  margin-bottom: 2px;
  width: 70%;
`;

const Message = styled.p`
  text-align: center;
  font-size: 12px;
`;
type Props = {
  messageText: string;
};

export const LineManager: React.FC<Props> = ({ messageText }) => {
  return (
    <MessageContainer>
      <Message>Line Manager - {messageText}</Message>
    </MessageContainer>
  );
};

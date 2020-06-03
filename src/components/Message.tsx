import React from "react";
import { ChatMessage } from "../types";
import styled from "styled-components";

const MessageWrapper = styled.div<Props>`
  background-color: ${(props) => (props.isUser ? "#b9cbdf" : "#fdbab4")};
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  width: 60%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const Name = styled.p`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Text = styled.p``;

type Props = {
  message: ChatMessage;
  isUser: boolean;
};

export const Message: React.FC<Props> = (props) => {
  return (
    <MessageWrapper {...props}>
      <Name>{props.message.name}</Name>
      <Text>{props.message.text}</Text>
    </MessageWrapper>
  );
};

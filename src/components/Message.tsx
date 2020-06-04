import React, { Fragment } from "react";
import { ChatMessage } from "../types";
import styled from "styled-components";

const colors : string[] = ["#d5dcf9","#caffb9","#a8ccc9","#a4b8c4","#daf7dc"]

const MessageWrapper = styled.div<Props>`
  background-color: ${(props) => (props.isUser ? "#FAFDED" : colors[Math.floor(Math.random() * colors.length)])};
  border-radius: 20px;
  padding: 8px;
  margin-bottom: 10px;
  max-width: 60%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const Name = styled.p<Props>`
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  font-size: 14px;
  letter-spacing: 1px;
  color: #FAFDED;
  margin: 10px 5px;
`;

const Text = styled.p`
  padding: 10px 15px;
  line-height: 20px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
`;

type Props = {
  message: ChatMessage;
  isUser: boolean;
};

export const Message: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Name {...props}>{props.message.name}</Name>
      <MessageWrapper {...props}>
        <Text>{props.message.text}</Text>
      </MessageWrapper>
    </Fragment>
  );
};

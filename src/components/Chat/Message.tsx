import React, { Fragment } from "react";
import { ChatMessage } from "../../types";
import styled from "styled-components";

const MessageWrapper = styled.div<Props>`
  background-color: ${(props) => (props.isUser ? "#FAFDED" : props.color)};
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
  color: #fafded;
  margin: 10px 5px;
`;

const Time = styled.p<Props>`
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  font-size: 12px;
  letter-spacing: 1px;
  color: orange;
  margin-top: 5px;
  display:none;
`;

const Text = styled.div`
  padding: 10px 15px;
  line-height: 20px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 16px;
  :active {
    p {
      display:block;
    }
  }
`;

type Props = {
  message: ChatMessage;
  isUser: boolean;
  color: string;
};


export const Message: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Name {...props}>{props.message.userName}</Name>
      <MessageWrapper {...props}>
        <Text>{props.message.text}
          <Time {...props}>{props.message.timestamp}</Time>
        </Text>
      </MessageWrapper>
    </Fragment>
  );
};

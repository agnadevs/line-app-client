import React from "react";
import { ChatMessage } from "../types";
import { Message } from "./Message";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  messages: ChatMessage[];
  userId: string;
};

export const MessagesList: React.FC<Props> = ({ messages, userId }) => {
  return (
    <Wrapper>
      {!!messages.length
        ? messages.map((message: ChatMessage, index: number) => {
            return (
              <Message
                key={index}
                isUser={userId === message.userId}
                message={message}
              />
            );
          })
        : null}
    </Wrapper>
  );
};

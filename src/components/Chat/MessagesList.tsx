import React, {useContext} from "react";
import { ChatMessage } from "../../types";
import { Message } from "./Message";
import styled from "styled-components";
import {userContext} from '../../context';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  messages: ChatMessage[];
  userId: string;
};

export const MessagesList: React.FC<Props> = ({ messages, userId }) => {
  const { currentUser } = useContext(userContext);

  return (
    <Wrapper>
      {!!messages.length
        ? messages.map((message: ChatMessage, index: number) => {
            return (
              <Message
                key={index}
                isUser={userId === message.userId}
                message={message}
                color={currentUser.color}
              />
            );
          })
        : null}
    </Wrapper>
  );
};

import React, { useContext, useRef, useEffect } from "react";
import { ChatMessage } from "../../types";
import { Message } from "./Message";
import { LineManager } from "./LineManager";
import styled from "styled-components";
import { UserContext } from "../../state/userContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  messages: ChatMessage[];
  userId: string;
};

export const MessagesList: React.FC<Props> = ({ messages, userId }) => {
  const { user } = useContext(UserContext);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages.length) return null;

  return (
    <Wrapper>
      {messages.map((message: ChatMessage, index: number) => {
        if (message.userName === "Line manager") {
          return <LineManager key={index} messageText={message.text} />;
        } else {
          return (
            <Message
              key={index}
              isUser={userId === message.userId}
              message={message}
              color={user.color}
            />
          );
        }
      })}
      <div ref={messagesEndRef}></div>
    </Wrapper>
  );
};

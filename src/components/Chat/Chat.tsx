import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { TextField } from "./ChatInput";
import { MessagesList } from "./MessagesList";
import { ChatMessage } from "../../types";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { checkAndSetUserContext } from "../../user";
import { store } from "../../state/store";

interface MatchParams {
  name: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const socket = io.connect("localhost:4000");

const ChatContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: grid;
  grid-template-rows: auto 60px;
`;

const DisplayMessagesContainer = styled.div`
  padding: 10px;
  overflow: scroll;
`;

const NewMessageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 20%;
  margin-left: 10px;
  background-color: #66a182;
  color: #fafded;
  letter-spacing: 2px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
`;

export const Chat: React.FC<Props> = (props) => {
  const [textInput, setTextInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const { state, dispatch } = useContext(store);
  const { user } = state;

  interface RouteParams {
    room: string;
  }
  const { room } = useParams<RouteParams>();

  useEffect(() => {
    checkAndSetUserContext(user, dispatch);
    socket.emit("joinRoom", {
      user: user,
      room,
    });
    socket.on("message", (chatMessage: ChatMessage) => {
      setChatHistory((chatHistory) => [...chatHistory, chatMessage]);
    });

    return () => {
      socket.emit("leaveRoom", {
        user: user,
        room,
      });

      socket.disconnect();
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      socket.emit("message", {
        name: user.userName,
        userId: user.userId,
        text: textInput,
      });
    }
    setTextInput("");
  };

  return (
    <ChatContainer>
      <DisplayMessagesContainer>
        <MessagesList userId={user.userId} messages={chatHistory} />
      </DisplayMessagesContainer>
      <NewMessageContainer>
        <Form onSubmit={sendMessage} autoComplete="off">
          <InputWrapper>
            <TextField
              id="text"
              handleChange={handleTextChange}
              value={textInput}
            />
            <Button>SEND</Button>
          </InputWrapper>
        </Form>
      </NewMessageContainer>
    </ChatContainer>
  );
};

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
  const [socketState, setSocketState] = useState<SocketIOClient.Socket | null>(null)
  const [textInput, setTextInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { state, dispatch } = useContext(store);
  const { user } = state;

  interface RouteParams {
    room: string;
  }
  const { room } = useParams<RouteParams>();


  useEffect(() => {
    const socket = io.connect("localhost:4000");
    setSocketState(socket)

    fetch(`http://localhost:4000/api/chat/${room}`)
      .then(res => res.json())
      .then(res => setMessages((messages) => [...messages, ...res]))
      .catch(err => console.log(err))

    checkAndSetUserContext(user, dispatch);
    socket.emit("joinRoom", {
      user: user,
      room,
    });

    socket.on("messageFromServer", (chatMessage: ChatMessage) => {
      setMessages((messages) => [...messages, chatMessage]);
    });

    return () => {
      socket.emit("leaveRoom", {
        user: user,
        room,
      });

      socket.disconnect();
      setSocketState(null)
    };
  }, [dispatch, room, user]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && socketState) {
      socketState.emit("messageFromClient", {
        userName: user.userName,
        userId: user.userId,
        text: textInput,
        timestamp: new Date()
      });
    }
    setTextInput("");
  };

  return (
    <ChatContainer>
      <DisplayMessagesContainer>
        <MessagesList userId={user.userId} messages={messages} />
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

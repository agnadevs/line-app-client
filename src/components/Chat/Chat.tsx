import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { ChatInput } from "./ChatInput";
import { MessagesList } from "./MessagesList";
import { ChatMessage, User, Room } from "../../types";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { checkAndSetUserContext } from "../../user";
import { UserContext } from "../../state/userContext";
import { RoomsContext } from "../../state/roomsContext";
import { UserMenu } from "../Application/Menu/UserMenu";
import { RoomsMenu } from "../Application/Menu/RoomsMenu";
import { getMessagesByRoomId } from "../../api";
import { MobileMenu } from "../Application/Menu/MobileMenu";
import { MenuSwitch } from "../Application/Menu/MenuSwitch";

interface MatchParams {
  name: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ChatContainer = styled.div`
  width: 70%;
  height: 95vh;
  display: grid;
  grid-template-rows: auto 60px;
  margin: 0 auto;
  padding: 5px;
  @media only screen and (max-width: 450px) {
    width: 90%;
  }
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
  const [socketState, setSocketState] = useState<SocketIOClient.Socket | null>(
    null
  );
  const [textInput, setTextInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [usersInRoom, setUsersInRoom] = useState<User[]>([]);

  const { user, addUser } = useContext(UserContext);
  const { rooms } = useContext(RoomsContext);

  interface RouteParams {
    roomId: string;
  }
  const { roomId } = useParams<RouteParams>();
  const currentRoom = rooms.find(
    (room: Room) => room.roomId === parseInt(roomId)
  );

  const onFetchedMessages = (data: ChatMessage[], error: any) => {
    if (error) {
      console.log(error);
      return;
    }
    setMessages((messages) => [...messages, ...data]);
  };

  useEffect(() => {
    const socket = io.connect("localhost:4000");
    setSocketState(socket);

    getMessagesByRoomId(roomId, onFetchedMessages);

    checkAndSetUserContext(user, addUser);
    socket.emit("joinRoom", {
      user: user,
      roomId,
    });

    socket.on("activeUsersInRoom", (activeUsers: User[]) => {
      console.log("socket active users", activeUsers);
      setUsersInRoom(activeUsers);
    });

    socket.on("messageFromServer", (chatMessage: ChatMessage) => {
      setMessages((messages) => [...messages, chatMessage]);
    });

    return () => {
      setMessages([]);
      socket.emit("leaveRoom", {
        user: user,
        roomId,
      });

      socket.disconnect();
      setSocketState(null);
    };
  }, [addUser, roomId, user]);

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
        timestamp: new Date(),
      });
    }
    setTextInput("");
  };

  return (
    <>
      <MenuSwitch currentRoom={currentRoom!} activeUsers={usersInRoom} />
      <ChatContainer>
        <DisplayMessagesContainer>
          <MessagesList userId={user.userId} messages={messages} />
        </DisplayMessagesContainer>
        <NewMessageContainer>
          <Form onSubmit={sendMessage} autoComplete="off">
            <InputWrapper>
              <ChatInput
                id="text"
                handleChange={handleTextChange}
                value={textInput}
              />
              <Button>SEND</Button>
            </InputWrapper>
          </Form>
        </NewMessageContainer>
      </ChatContainer>
    </>
  );
};

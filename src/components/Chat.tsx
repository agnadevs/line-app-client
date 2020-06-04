import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField } from "./TextField";
import { MessagesList } from "./MessagesList";
import { ChatMessage } from "../types";
import styled from "styled-components";

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
  background-color: #66A182;
  color: #FAFDED;
  letter-spacing: 2px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
`;

export const Chat: React.FC = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("message", (chatMessage: ChatMessage) => {
      setChatHistory((chatHistory) => [...chatHistory, chatMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", { name: "lille_grisen", text: textInput });
    setTextInput("");
  };

  return (
    <ChatContainer>
      <DisplayMessagesContainer>
        <MessagesList userId={socket.id} messages={chatHistory} />
      </DisplayMessagesContainer>
      <NewMessageContainer>
        <Form onSubmit={sendMessage} autoComplete="off">
          {/* <TextField
            label="Name: "
            id="name"
            handleChange={handleNameChange}
            value={nameInput}
          /> */}
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

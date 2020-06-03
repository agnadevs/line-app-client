import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField } from "./TextField";
import { MessagesList } from "./MessagesList";
import { ChatMessage } from "../types";
import styled from "styled-components";

const socket = io.connect("localhost:4000");

const ChatContainer = styled.div`
  width: 500px;
  height: 600px;
  display: grid;
  grid-template-rows: auto 60px;
  border: 1px solid black;
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
    socket.emit("message", { name: "Gris", text: textInput });
    setTextInput("");
  };

  return (
    <ChatContainer>
      <DisplayMessagesContainer>
        <MessagesList userId={socket.id} messages={chatHistory} />
      </DisplayMessagesContainer>
      <NewMessageContainer>
        <Form onSubmit={sendMessage}>
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
            <button>Send</button>
          </InputWrapper>
        </Form>
      </NewMessageContainer>
    </ChatContainer>
  );
};

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField } from "./TextField";
import { MessagesList } from "./MessagesList";
import { ChatMessage } from "../types";
const socket = io.connect("localhost:4000");

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
    socket.emit("message", { name: nameInput, text: textInput });
    setTextInput("");
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <TextField
          label="Name: "
          id="name"
          handleChange={handleNameChange}
          value={nameInput}
        />
        <TextField
          label="Message: "
          id="text"
          handleChange={handleTextChange}
          value={textInput}
        />
        <button>Send</button>
      </form>
      <MessagesList messages={chatHistory} />
    </div>
  );
};

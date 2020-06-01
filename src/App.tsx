import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("localhost:4000");

export default () => {
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");

  interface ChatMessage {
    name: string;
    text: string;
  }

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("message", (message: ChatMessage) => {
      setChatHistory([...chatHistory, message]);
    });
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", { name, text });
    setText("");
  };

  return (
    <div>
      <header>Drop me a line!</header>
      <form onSubmit={sendMessage}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <label htmlFor="text">Message:</label>
        <input
          type="text"
          id="text"
          name="text"
          onChange={handleTextChange}
          value={text}
        />
        <button>Send</button>
      </form>

      {!!chatHistory.length &&
        chatHistory.map((message: ChatMessage, index: number) => {
          return (
            <div key={index}>
              <p>
                <strong>{message.name}</strong>
              </p>
              <p>{message.text}</p>
            </div>
          );
        })}
    </div>
  );
};

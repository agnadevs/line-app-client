import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { User } from "../types";
import { InfoBox } from "./application/InfoBox";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 2px 2px 5px #888888;
  width: 50%;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const Subheader = styled.h3`
  text-align: center;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  :focus::placeholder {
    color: transparent;
  }
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 20%;
  padding: 10px;
  background-color: lightblue;
  border: none;
  border-radius: 4px;
  font-weight: bold;
`;

type Info = {
  text: string;
  isError: boolean;
};

export const Welcome: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [showInfo, setShowInfo] = useState<Info>({ text: "", isError: false });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);

  const enterWithName = (e: React.FormEvent<HTMLFormElement>) => {
    setShowInfo({ text: "", isError: false });
    e.preventDefault();
    if (name === "") {
      setShowInfo({ text: "Enter a name please", isError: true });
      return;
    }

    const userNameExists = users.find(
      (user: User) => user.userName.toLowerCase() === name.toLowerCase()
    );

    if (userNameExists) {
      setShowInfo({
        text: `${name} already exists. Choose a different user name.`,
        isError: false,
      });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    fetch("http://localhost:4000/api/users/newUser", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const onNameChange = (name: string) => {
    setShowInfo({ text: "", isError: false });
    setName(name);
  };

  return (
    <WelcomeContainer>
      <Header>Welcome to Line!</Header>
      <Subheader>Enter your name to join the conversation.</Subheader>
      <Form onSubmit={enterWithName} autoComplete="off">
        <Input
          ref={inputRef}
          id="userName"
          type="text"
          placeholder="Your name"
          onChange={(e) => onNameChange(e.target.value)}
        />
        {showInfo.text ? <InfoBox {...showInfo} /> : null}
        <Button>Enter</Button>
      </Form>
    </WelcomeContainer>
  );
};

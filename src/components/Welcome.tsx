import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { User } from '../types';

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
`;

const Button = styled.button`
  width: 20%;
  padding: 10px;
  background-color: lightblue;
  border: none;
  border-radius: 4px;
  font-weight: bold;
`;

export const Welcome: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState <User[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then(res => setUsers(res))
  },[])

  //

  const enterWithName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") {
      console.log("Enter a name please");
      return;
    }

    const userNameExists = users.find((user: User) => user.userName === name)

    if (userNameExists) {
      console.log("Name already exists. Choose a different user name.");
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
    setName(name);

  };

  return (
    <WelcomeContainer>
      <Header>Welcome to Line!</Header>
      <Subheader>Enter your name to join the conversation.</Subheader>
      <Form onSubmit={enterWithName}>
        <Input
          type="text"
          placeholder="Your name"
          onChange={(e) => onNameChange(e.target.value)}
        />
        <Button>Enter</Button>
      </Form>
    </WelcomeContainer>
  );
};

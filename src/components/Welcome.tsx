import React, { useState } from "react";
import styled from "styled-components";

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

  const enterWithName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") {
      console.log("Enter a name please");
      return;
    }

    doFetch("http://localhost:4000/api/users/newUser", { name });
  };

  type Data = {
    name: string;
  };

  const doFetch = async (url: string, data: Data) => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
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

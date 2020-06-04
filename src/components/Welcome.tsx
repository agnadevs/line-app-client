import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { User } from "../types";
import { InfoBox } from "./application/InfoBox";
import Cookies from "js-cookie";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 70px;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 75px;
  color: #FAFDED;
  letter-spacing: 2px;
`;

const Subheader = styled.span`
  text-align: center;
  margin-bottom: 50px;
  font-size: 20px;
  color: #FAFDED;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  background-color: transparent;
  border: 1px solid #FAFDED;
  color: #FAFDED;
  font-size: 20px;
  letter-spacing: 4px;
  ::placeholder {
    color: #FAFDED;
  }
  :focus::placeholder {
    color: transparent;
  }
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 200px;
  padding: 20px;
  margin-top: 30px;
  background-color: #66A182;
  color: #FAFDED;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  letter-spacing: 2px;
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
      .then((res) => {
        console.log(res);
        Cookies.set("user", res, { expires: 7 });
      });
  };

  const onNameChange = (name: string) => {
    setShowInfo({ text: "", isError: false });
    setName(name);
  };

  return (
    <WelcomeContainer>
      <Header>Line App</Header>
      <Subheader>Choose a username to join the discussion.</Subheader>
      <Form onSubmit={enterWithName} autoComplete="off">
        <Input
          ref={inputRef}
          id="userName"
          type="text"
          placeholder="Your name"
          onChange={(e) => onNameChange(e.target.value)}
        />
        {showInfo.text ? <InfoBox {...showInfo} /> : null}
        <Button>ENTER</Button>
      </Form>
    </WelcomeContainer>
  );
};

import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { UserContext } from "../../state/userContext";
import { InfoBox } from "../Application/InfoBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  border-radius: 50%;
  margin: 20px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.span`
  font-size: 16px;
  font-family: "IBM Plex Mono", monospace;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 5px auto;
`;
const Input = styled.input`
  width: 300px;
  height: 30px;
  padding: 10px;
  margin: 10px auto;
  text-align: center;
`;
const Button = styled.button`
  width: 300px;
  height: 40px;
  padding: 10px;
  margin: 10px auto;
  color: ${(props) => (props.disabled ? "#F5F5F4" : "#33cc00")};
  background-color: ${(props) => (props.disabled ? "#CFCCC9" : "#caffb9")};
  border: none;
  border-radius: 3px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 3px;
  z-index: 1;
  :hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    color: ${(props) => (props.disabled ? "#F5F5F4" : "#33cc00")};
    background-color: ${(props) => (props.disabled ? "#CFCCC9" : "#caffb9")};
  }
`;

type Props = {
  userName: string;
  userId: string;
  profileImageURL: string;
};

export const EditUser: React.FC<Props> = ({
  userName,
  userId,
  profileImageURL,
}) => {
  const [name, setName] = useState<string>(userName);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const { user, addUser } = useContext(UserContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const saveProfile = (e: React.FormEvent<HTMLFormElement>): void => {
    setDisabled(true);
    e.preventDefault();
    const data = {
      userName: name,
      userId,
    };
    fetch("http://localhost:4000/api/users/update", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const updatedUser = {
          userName: res.data.userName,
          userId: user.userId,
          profileImageURL: res.data.profileImageURL,
          color: user.color,
        };
        addUser(updatedUser);
        Cookies.set("user", user, { expires: 7 });
        setSaved(true);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSaved(false);
    if (userName !== e.target.value) {
      setDisabled(false);
    }
    setName(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Container>
      <Image src={profileImageURL} alt="profileImage"></Image>
      <Form onSubmit={saveProfile}>
        <Label>Username:</Label>
        <Input ref={inputRef} value={name} onChange={handleChange} />
        {/* <Label>First name:</Label>
        <Input value="First name" />
        <Label>Last name:</Label>
        <Input value="Last name" /> */}
        <Button disabled={disabled}>Save</Button>
        {saved || error ? (
          <InfoBox
            text={
              saved
                ? "Your changes have been saved!"
                : "Something went wrong, try again!"
            }
            isError={saved ? false : true}
          />
        ) : null}
      </Form>
    </Container>
  );
};

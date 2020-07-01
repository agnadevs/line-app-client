import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { UserContext } from "../../../state/userContext";
import { InfoBox } from "../InfoBox";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Input } from "../Input";
import { User } from "../../../types";
import { updateUserById } from "../../../api";

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

type Props = {
  modal: {
    open: boolean;
    modalName: string;
    closeModalCallback: () => void;
  };
};

export const EditUser: React.FC<Props> = ({ modal }) => {
  const { user, addUser } = useContext(UserContext);
  const { userName, userId, profileImageURL } = user;
  const { open, modalName, closeModalCallback } = modal;

  const [name, setName] = useState<string>(userName);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUpdateComplete = (data: User, error: any) => {
    if (error) {
      setError(true);
      return;
    }
    const updatedUser = {
      userName: data.userName,
      userId: user.userId,
      profileImageURL: user.profileImageURL,
      color: user.color,
    };
    addUser(updatedUser);
    Cookies.set("user", updatedUser, { expires: 7 });
    setSaved(true);
  };

  const saveProfile = (e: React.FormEvent<HTMLFormElement>): void => {
    setDisabled(true);
    e.preventDefault();

    const body = JSON.stringify({
      userName: name,
      userId,
    });
    updateUserById(body, onUpdateComplete);
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
    <Modal
      open={open}
      modalName={modalName}
      closeModalCallback={closeModalCallback}
    >
      <Container>
        <Image src={profileImageURL} alt="profileImage"></Image>
        <Form onSubmit={saveProfile}>
          <Label>Username:</Label>
          <Input ref={inputRef} value={name} onChange={handleChange} />
          <Button disabled={disabled} title="Save" />
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
    </Modal>
  );
};

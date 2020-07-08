import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { RoomsContext } from "../../../state/roomsContext";
import { UserContext } from "../../../state/userContext";
import { Modal } from "./Modal";
import { InfoBox } from "../InfoBox";
import { Button } from "../Button";
import { Input } from "../Input";
import { Room } from "../../../types";
import { postNewRoom } from "../../../api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  modal: {
    open: boolean;
    modalName: string;
    closeModalCallback: () => void;
  };
};

type Info = {
  text: string;
  isError: boolean;
};

export const CreateRoom: React.FC<Props> = ({ modal }) => {
  const { open, modalName, closeModalCallback } = modal;
  const { addNewRoom } = useContext(RoomsContext);
  const { user } = useContext(UserContext);
  const [roomName, setRoomName] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPostComplete = (data: Room, error: any) => {
    if (error) {
      setError(true);
      return;
    }
    setSaved(true);
    addNewRoom(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    if (roomName === "") {
      console.log("Please enter a room name");
    }
    const body = JSON.stringify({ userId: user.userId, roomName });
    postNewRoom(body, onPostComplete);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setDisabled(false);
    setRoomName(e.target.value);
  };
  return (
    <Modal
      open={open}
      modalName={modalName}
      closeModalCallback={closeModalCallback}
    >
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleNameChange}
          value={roomName}
          placeholder="Room name"
          ref={inputRef}
        />
        <Button title="Create room" disabled={disabled} />
        {saved || error ? (
          <InfoBox
            text={
              saved
                ? "Your room has been created!"
                : "Something went wrong, try again!"
            }
            isError={saved ? false : true}
          />
        ) : null}
      </Form>
    </Modal>
  );
};

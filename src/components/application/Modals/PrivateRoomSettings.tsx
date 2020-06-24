import React, { useState, useContext } from "react";
import styled from "styled-components";
import { InviteUser } from "../InviteUser";
import { Modal } from "./Modal";
import { Input } from "../Input";
import { Button } from "../Button";
import { InfoBox } from "../InfoBox";
import { RoomsContext } from "../../../state/roomsContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomDetailsForm = styled.form`
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
  roomDetails: {
    roomId: number | null;
    title: string;
  };
};

export const PrivateRoomSettings: React.FC<Props> = ({
  modal,
  roomDetails,
}) => {
  const { open, modalName, closeModalCallback } = modal;
  const [roomName, setRoomName] = useState<string>(roomDetails.title);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const { updateRoom } = useContext(RoomsContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSaved(false);
    if (roomName !== e.target.value) {
      setDisabled(false);
    }
    setRoomName(e.target.value);
  };

  const saveRoomDetails = (e: React.FormEvent<HTMLFormElement>): void => {
    setDisabled(true);
    e.preventDefault();

    fetch(`http://localhost:4000/api/rooms/${roomDetails.roomId}/update`, {
      method: "PUT",
      body: JSON.stringify({ roomName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        updateRoom(res.data);
        setSaved(true);
      })
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <Modal
      open={open}
      modalName={modalName}
      closeModalCallback={closeModalCallback}
    >
      <Wrapper>
        <RoomDetailsForm onSubmit={saveRoomDetails}>
          <Input value={roomName} onChange={handleChange} />
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
        </RoomDetailsForm>
        <InviteUser roomId={roomDetails.roomId} />
      </Wrapper>
    </Modal>
  );
};

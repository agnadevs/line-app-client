import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import { UserContext } from "../../../state/userContext";
import { AuthContext } from "../../../state/authContext";
import { InfoBox } from "../InfoBox";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Input } from "../Input";
import { User } from "../../../types";
import { updateUserById, deleteUserAccount } from "../../../api";

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
  align-items: center;
`;

const Label = styled.span`
  font-size: 16px;
  font-family: "IBM Plex Mono", monospace;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 5px auto;
`;

const DeleteContainer = styled.div<StyleProps>`
  display: ${(props) => (props.hide === true ? "none" : "flex")};
  flex-direction: column;
`;

const ConfirmContainer = styled.div`
  flex-direction: row;
`;

const Disclaimer = styled.p`
  width: 580px;
  text-align: center;
  font-size: 0.8rem;
  line-height: 1rem;
  padding: 25px;
  background-color: #ee4f2f;
  color: white;
  border-radius: 3px;
`;

type StyleProps = {
  hide: boolean;
};

type Props = {
  modal: {
    open: boolean;
    modalName: string;
    closeModalCallback: () => void;
  };
};

export const EditUser: React.FC<Props> = ({ modal }) => {
  const { user, addUser, removeUser } = useContext(UserContext);
  const { isUserLoggedIn } = useContext(AuthContext);
  const { userName, userId, profileImageURL } = user;
  const { open, modalName, closeModalCallback } = modal;

  const [name, setName] = useState<string>(userName);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [deleteDone, setDeleteDone] = useState({ done: false, message: "" });
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

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

  const logout = () => {
    Cookies.remove("user");
    removeUser();
    isUserLoggedIn(false);
    history.push("/");
  };

  const onDeleteComplete = (data: string, error: any) => {
    if (error) {
      setError(true);
      return;
    }
    setDeleteDone({
      done: true,
      message: `${data} You will be logged out in 5 seconds.`,
    });
    setTimeout(() => {
      logout();
    }, 5000);
  };

  const deleteAccount = () => {
    setDeleteConfirmed(true);
    deleteUserAccount(user.userId, onDeleteComplete);
  };

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
        <DeleteContainer hide={showDeletePrompt}>
          <Button
            title="Delete my account"
            onClick={() => setShowDeletePrompt(true)}
            delete={true}
          />
        </DeleteContainer>

        {showDeletePrompt && (
          <ConfirmContainer>
            <Disclaimer>
              If you choose to delete your account, we will remove all data
              connected to your account.
              <br />
              <br />
              This includes all your historic messages in all chat rooms, your
              access to the private chat rooms you have been invited to, as well
              as the removal of chat rooms for which you are admin.
              <br />
              <br />
              There's no turning back - logging in with the same Google account
              in the future will not restore this data, so make sure you're 100%
              certain you want to delete your account!
            </Disclaimer>
            <Button
              title="Yes, I'm sure."
              onClick={deleteAccount}
              disabled={deleteConfirmed}
            />
            <Button
              title="No, I changed my mind!"
              onClick={() => setShowDeletePrompt(false)}
              disabled={deleteConfirmed}
              standardBtn
            />
          </ConfirmContainer>
        )}
        {deleteDone.done || error ? (
          <InfoBox
            text={
              deleteDone.done
                ? deleteDone.message
                : "Unable to delete account, please try again."
            }
            isError={deleteDone.done ? false : true}
          />
        ) : null}
      </Container>
    </Modal>
  );
};

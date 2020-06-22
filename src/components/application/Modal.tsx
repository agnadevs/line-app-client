import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledModal = styled.div<Props>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 7px;
  width: 80%;
`;

const Title = styled.div`
  width: 100%;
  height: 60px;
  h1 {
    font-size: 20px;
    text-align: center;
    letter-spacing: 2px;
    margin-top: 20px;
  }
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  padding: 10px;
  margin: 10px auto;
  background-color: #a8ccc9;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #3c6763;
  :hover {
    cursor: pointer;
    color: #a8ccc9;
    background-color: #3c6763;
  }
`;

type Props = {
  open: boolean;
  modalName: string;
  closeModalCallback: () => void;
};

export const Modal: React.FC<Props> = (props) => {
  const styledModalRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (
      styledModalRef.current &&
      !styledModalRef.current.contains(e.target as Node)
    ) {
      props.closeModalCallback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <StyledModal {...props}>
      <Content ref={styledModalRef}>
        <Title>
          <h1>{props.modalName}</h1>
        </Title>
        {props.children}
        <Button onClick={() => props.closeModalCallback()}>Close</Button>
      </Content>
    </StyledModal>
  );
};

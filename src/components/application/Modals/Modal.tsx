import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "../Button";

const StyledModal = styled.div<Props>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  z-index: 1;
  padding-top: 40px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 7px;
  width: 80%;
  max-height: 80%;
  overflow: scroll;
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

type Props = {
  open: boolean;
  modalName: string;
  closeModalCallback: () => void;
};

export const Modal: React.FC<Props> = (props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      props.closeModalCallback();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("click", handleClick);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <StyledModal {...props}>
      <Content ref={contentRef}>
        <Title>
          <h1>{props.modalName}</h1>
        </Title>
        {props.children}
        <Button
          title="Close"
          standardBtn
          onClick={() => props.closeModalCallback()}
        />
      </Content>
    </StyledModal>
  );
};

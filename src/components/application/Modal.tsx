import React from "react";
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
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

type Props = {
  open: boolean;
  closeModalCallback: () => void;
};

export const Modal: React.FC<Props> = (props) => {
  console.log(props.children);
  return (
    <StyledModal {...props}>
      <Content>
        <button onClick={() => props.closeModalCallback()}>Close</button>
        <h2>I am a modal</h2>
      </Content>
    </StyledModal>
  );
};

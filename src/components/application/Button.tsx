import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<Props>`
  width: 300px;
  height: 40px;
  padding: 10px;
  margin: 10px;
  color: ${(props) =>
    props.disabled
      ? "#F5F5F4"
      : props.delete
      ? "#EE4F2F"
      : props.standardBtn
      ? "#3c6763"
      : "#33cc00"};
  background-color: ${(props) =>
    props.disabled
      ? "#CFCCC9"
      : props.delete
      ? "#F69F8E"
      : props.standardBtn
      ? "#a8ccc9"
      : "#caffb9"};
  border: none;
  border-radius: 3px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 3px;
  z-index: 1;
  :hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    color: ${(props) =>
      props.disabled
        ? "#F5F5F4"
        : props.delete
        ? "#F69F8E"
        : props.standardBtn
        ? "#a8ccc9"
        : "#caffb9"};
    background-color: ${(props) =>
      props.disabled
        ? "#CFCCC9"
        : props.delete
        ? "#EE4F2F"
        : props.standardBtn
        ? "#3c6763"
        : "#33cc00"};
  }
  @media only screen and (max-width: 450px) {
    width: 275px;
  }
`;

type Props = {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  standardBtn?: boolean;
  delete?: boolean;
};

export const Button: React.FC<Props> = (props) => {
  return (
    <StyledButton onClick={props.onClick} {...props}>
      {props.title}
    </StyledButton>
  );
};

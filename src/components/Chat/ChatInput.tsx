import React, { Fragment } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 90%;
  height: 60px;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #fafded;
  color: #0e0f19;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

type TextFieldProps = {
  value: string;
  label?: string;
  id: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  id,
  handleChange,
}) => {
  return (
    <Fragment>
      {label && <label htmlFor={id}>{label}</label>}
      <Input
        type="text"
        id={id}
        onChange={handleChange}
        value={value}
        placeholder="Message.."
      />
    </Fragment>
  );
};

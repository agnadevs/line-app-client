import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
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
    <Wrapper>
      {label && <label htmlFor={id}>{label}</label>}
      <Input
        type="text"
        id={id}
        onChange={handleChange}
        value={value}
        placeholder="Message.."
      />
    </Wrapper>
  );
};

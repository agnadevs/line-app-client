import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 300px;
  height: 30px;
  padding: 10px;
  margin: 10px auto;
  text-align: center;
`;

type Ref = HTMLInputElement;

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
};

export const Input = forwardRef<Ref, Props>((props, ref) => {
  return (
    <StyledInput
      type="text"
      ref={ref}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder || ""}
    />
  );
});

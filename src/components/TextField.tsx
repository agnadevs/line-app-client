import React from "react";

interface TextFieldProps {
  value: string;
  label: string;
  id: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  id,
  handleChange,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        //   name="text"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

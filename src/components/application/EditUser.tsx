import React, { useState, useEffect, useRef } from "react";

type Props = {
  userName: string;
};

export const EditUser: React.FC<Props> = ({ userName }) => {
  const [name, setName] = useState<string>(userName);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const saveName = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <form onSubmit={saveName}>
        <input ref={inputRef} value={name} onChange={handleChange} />
        <button>Send</button>
      </form>
    </div>
  );
};

import React, { createContext, useState } from "react";

type User = {
  userName: string;
  userId: string;
  profileImageURL: string;
  color: string;
};

type ContextProps = {
  user: User;
  addUser: (user: User) => void;
  removeUser: () => void;
};

const initialUser = {
  userName: "",
  userId: "",
  profileImageURL: "",
  color: "",
};

const UserContext = createContext({} as ContextProps);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);

  const addUser = (user: User) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(initialUser);
  };

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

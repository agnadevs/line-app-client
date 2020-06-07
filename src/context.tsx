import React from "react";

type User = {
  userName: string;
  userId: string;
  color: string;
};

export interface UserContext {
  currentUser: User;
  setCurrentUser: (currentUser: User) => void;
}

export const USER_DEFAULT_VALUE = {
  currentUser: {
    userName: "",
    userId: "",
    color: "",
  },
  setCurrentUser: () => {},
};

export const userContext = React.createContext<UserContext>(USER_DEFAULT_VALUE);

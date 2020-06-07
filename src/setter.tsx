import React, { useState, useCallback } from "react";
import { UserContext } from "./context";

export const useUser = (): UserContext => {
  const [user, setUser] = useState({ userName: "", userId: "", color: ""});

  type User = {
    userName: string;
    userId: string;
    color: string;
  };

  const setCurrentUser = useCallback((currentUser: User): void => {
      setUser(currentUser);
  }, []);

  return {
      currentUser: user,
      setCurrentUser
  }
};

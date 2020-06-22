import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../../state/authContext";

export interface LoggedInRouteProps extends RouteProps {}

export const LoggedInRoute: React.FC<LoggedInRouteProps> = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

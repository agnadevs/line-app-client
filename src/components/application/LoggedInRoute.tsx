import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { authContext } from "../../state/authContext";

export interface LoggedInRouteProps extends RouteProps {}

export const LoggedInRoute: React.FC<LoggedInRouteProps> = (props) => {
  const { authState } = useContext(authContext);

  if (authState.isLoggedIn) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

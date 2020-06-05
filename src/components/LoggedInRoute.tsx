import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

type IProps = {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
};
export const LoggedInRoute = ({
  component: Component,
  ...otherProps
}: IProps) => {
  return (
    <>
      <Route
        render={(otherProps) =>
          !!Cookies.get("user") ? (
            <Component {...otherProps} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </>
  );
};

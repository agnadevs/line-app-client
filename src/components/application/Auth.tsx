import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../state/authContext";
import { Route, Redirect } from "react-router-dom";

export const Auth = () => {
  const hasCookie = !!Cookies.get("user");
  const { isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (hasCookie) {
      isUserLoggedIn(true);
    }
  }, [hasCookie, isUserLoggedIn]);

  return (
    <div>
      <Route>
        {hasCookie ? <Redirect to="/lounge" /> : <Redirect to="/login" />}
      </Route>
    </div>
  );
};

import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { authContext } from "../../state/authContext";
import { Route, Redirect } from "react-router-dom";

export const Auth = () => {
  const hasCookie = !!Cookies.get("user");
  const { dispatch } = useContext(authContext);

  useEffect(() => {
    if (hasCookie) {
      dispatch({ type: "SET_AUTH", data: true });
    }
  }, [hasCookie, dispatch]);

  return (
    <div>
      <Route>
        {hasCookie ? <Redirect to="/lounge" /> : <Redirect to="/login" />}
      </Route>
    </div>
  );
};

import React, { Fragment } from "react";
import Menu from "./components/menu/Menu";
import { Chat } from "./components/Chat";
import { Welcome } from "./components/Welcome";
import { LoggedInRoute } from "./components/LoggedInRoute";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

export default () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {!!Cookies.get("user") ? <Redirect to="/menu" /> : <Welcome />}
          </Route>

          <LoggedInRoute path="/menu" component={Menu} />
          <LoggedInRoute path="/chat" component={Chat} />
          {/* <Route component={Welcome} path="/" /> */}

          {/* <Route component={Menu} path="/menu" />
          <Route component={Chat} path="/chat" /> */}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      {/* {!!Cookies.get("user") ? <Menu /> : <Welcome />} */}
    </Fragment>
  );
};

const NotFound = () => {
  console.log("404");
  return <div>404 - Page not found</div>;
};

/*
1. Context API för att spara user info globalt
2. Hantering för radering av kaka
3. Rooms
4. Routing

*/

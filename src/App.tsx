import React, { Fragment } from "react";
import Menu from "./components/Menu/Menu";
import { Chat } from "./components/Chat/Chat";
import { Welcome } from "./components/Login";
import { LoggedInRoute } from "./components/Application/LoggedInRoute";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { StateProvider } from "./state/store";

export default () => {
  return (
    <Fragment>
      <StateProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              {!!Cookies.get("user") ? <Redirect to="/menu" /> : <Welcome />}
            </Route>

            <LoggedInRoute path="/menu" component={Menu} />
            <LoggedInRoute path="/chat/:room" component={Chat} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </StateProvider>
    </Fragment>
  );
};

const NotFound = () => {
  return <div>404 - Page not found</div>;
};

/*
1. Context API för att spara user info globalt
2. Rooms
  - Spara ner meddelanden, hitta format som funkar.
3. Routing
  - automatiskt komma vidare till menu när angett namn
  - automatiskt tas tillbaka till welcome on cookie tas bort/expires.
4. Header till chat room med tillbaka knapp, namn på rummet etc.
  - utfällbar del till hö/vä med lista över alla namn i chatten "just nu".
  - timestamp på meddelanden
*/

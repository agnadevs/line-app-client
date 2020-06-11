import React, { Fragment } from "react";
import Lounge from "./components/Lounge/Lounge";
import { Chat } from "./components/Chat/Chat";
import { Login } from "./components/Login";
import { LoggedInRoute } from "./components/Application/LoggedInRoute";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { StateProvider } from "./state/store";
import { RoomsProvider } from "./state/roomsContext";

export default () => {
  return (
    <Fragment>
      <StateProvider>
        <RoomsProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                {!!Cookies.get("user") ? <Redirect to="/menu" /> : <Login />}
              </Route>

              <LoggedInRoute path="/menu" component={Lounge} />
              <LoggedInRoute path="/chat/:room" component={Chat} />

              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </RoomsProvider>
      </StateProvider>
    </Fragment>
  );
};

const NotFound = () => {
  return <div>404 - Page not found</div>;
};

/*
1. / KLAR ------ Context API för att spara user info globalt
1.5 / KLAR ------ Spara alla users som är i ett chatrum i context
  - utfällbar del till hö/vä med lista över alla namn i chatten "just nu".
2. / KLAR ------ Rooms
  - Spara ner meddelanden, hitta format som funkar.
3. / KLAR ------ Routing
    - automatiskt komma vidare till menu när angett namn
    - automatiskt tas tillbaka till welcome on cookie tas bort/expires.

4. Header till chat room med tillbaka knapp, namn på rummet etc.
5. Omstrukturering --- Home > Menu | Chat < Home
*/

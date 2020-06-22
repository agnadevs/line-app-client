import React, { Fragment } from "react";
import Lounge from "./components/Lounge/Lounge";
import { Chat } from "./components/Chat/Chat";
import { Login } from "./components/Login";
import { LoggedInRoute } from "./components/Application/LoggedInRoute";
import { Auth } from "./components/Application/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { UserProvider } from "./state/userContext";
import { RoomsProvider } from "./state/roomsContext";
import { AuthProvider } from "./state/authContext";

export default () => {
  return (
    <Fragment>
      <AuthProvider>
        <UserProvider>
          <RoomsProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Auth} />
                <Route path="/login" exact component={Login} />
                <LoggedInRoute path="/lounge" component={Lounge} />
                <LoggedInRoute path="/chat/:roomId" component={Chat} />

                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </RoomsProvider>
        </UserProvider>
      </AuthProvider>
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

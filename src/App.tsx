import React, { Fragment } from "react";
import Menu from "./components/menu/Menu";
import { Chat } from "./components/Chat";
import { Welcome } from "./components/Welcome";
import { LoggedInRoute } from "./components/LoggedInRoute";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { userContext } from "./context";
import { useUser } from "./setter";

export default () => {
  const user = useUser();

  return (
    <Fragment>
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              {!!Cookies.get("user") ? <Redirect to="/menu" /> : <Welcome />}
            </Route>

            <LoggedInRoute path="/menu" component={Menu} />
            {/* <LoggedInRoute path="/chat/:room" component={Chat} /> */}

            <Route path="/chat/:room" component={Chat} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
      {/* {!!Cookies.get("user") ? <Menu /> : <Welcome />} */}
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

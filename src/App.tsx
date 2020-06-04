import React, { Fragment } from "react";
import styled from "styled-components";
import Menu from "./components/menu/Menu";
import { Chat } from "./components/Chat";
import { Welcome } from "./components/Welcome";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// const Wrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   /* position: relative;
//   width: 1000px;
//   margin: 0 auto;
//   top: 100px; */
// `;

const Home = () => {
  return <div>Home</div>;
};

const About = () => {
  return <div>About</div>;
};

const Contact = () => {
  return <div>Contact</div>;
};

export default () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {!!Cookies.get("user") ? <Redirect to="/menu" /> : <Welcome />}
          </Route>
          <Route component={Menu} path="/menu" />
          <Route component={Chat} path="/chat" />
        </Switch>
      </BrowserRouter>
      {/* {!!Cookies.get("user") ? <Menu /> : <Welcome />} */}
    </Fragment>
  );
};

/*
1. Context API för att spara user info globalt
2. Hantering för radering av kaka
3. Rooms
4. Routing

*/

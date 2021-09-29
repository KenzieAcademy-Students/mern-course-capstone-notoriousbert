import React from "react";
import { Redirect, Route, Switch } from "react-router";
import {
  HomePage,
  LandingPage,
  LoginPage,
  MapPage,
  PlacesDetailPage,
  UserProfilePage,
  UserRegistrationPage,
  AddAPlacePage,
} from "pages";

import { ErrorBoundary, Navbar, Header } from "components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./app.scss";
import { useProvideAuth } from "hooks/useAuth";
import axios from "axios";

export default function App() {
//   const {
//     state: { user },
//   } = useProvideAuth();
// console.log(useProvideAuth())

  return (
    <ErrorBoundary>
      <div className="app">
        <ToastContainer />
        <Navbar />
        <div className="sections">
          <Container
            fluid
            noGutters
            style={{
              height: "calc(100vh - 72px)",
              overflow: "auto",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}

          >
            <Switch>
              <Route exact path="/users/:uid" component={UserProfilePage} />
              <Route exact path="/signup" component={UserRegistrationPage} />
              <Route exact path="/add-a-place" component={AddAPlacePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/map" component={MapPage} />
            </Switch>
          </Container>
        </div>
      </div>
    </ErrorBoundary>
  );
}

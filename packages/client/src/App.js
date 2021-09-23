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

export default function App() {
  return (
    <ErrorBoundary>
      <ToastContainer />
      <Navbar/>
      <Container
        fluid
        style={{
          height: "calc(100vh - 72px)",
          overflow: "auto",
        }}
      >
        <Row>
          <Col xs={0} md={2} xl={3} />
          <Col xs={12} md={8} xl={6}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signup" component={UserRegistrationPage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </Col>
          <Col xs={0} md={2} xl={3} />
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

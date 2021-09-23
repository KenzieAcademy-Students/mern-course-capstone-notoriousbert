import React from "react";
import ReactDOM from "react-dom";
import App from 'App'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  HomePage,
  LandingPage,
  LoginPage,
  MapPage,
  PlacesDetailPage,
  UserProfilePage,
  UserRegistrationPage,
} from "pages";
import { Navbar, Header } from "components";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
=======
import 'bootstrap/dist/css/bootstrap.min.css';

>>>>>>> 51f590c97c0407578ebda00cb9799a7ffeecf9e6

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <App />
=======
    <Navbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/map' component={MapPage} />
        <Route exact path='/signup' component={UserRegistrationPage} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
>>>>>>> 51f590c97c0407578ebda00cb9799a7ffeecf9e6
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

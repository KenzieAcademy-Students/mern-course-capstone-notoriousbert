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
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

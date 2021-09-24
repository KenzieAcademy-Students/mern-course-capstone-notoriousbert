import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  HomePage,
  LandingPage,
  LoginPage,
  MapPage,
  PlacesDetailPage,
  UserProfilePage,
  UserRegistrationPage
} from "pages";
import Navbar from './components/Layout/Navbar';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path='/' component={UserProfilePage} />
        <Route exact path='/map' component={MapPage} />
        <Route exact path='/signup' component={UserRegistrationPage} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

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
        <Route exact path='/' component={LandingPage} />
<<<<<<< HEAD
        <Route exact path='/places/placeId'component={PlacesDetailPage}   />
=======
        <Route exact path='/map' component={MapPage} />
>>>>>>> 51f590c97c0407578ebda00cb9799a7ffeecf9e6
        <Route exact path='/signup' component={UserRegistrationPage} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

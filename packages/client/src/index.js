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
  UserRegistrationPage,
} from "pages";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MapPage} />
        {/* Add more routes here */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

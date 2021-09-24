import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "AppRouter";
import { ProvideAuth } from "hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/places/placeId'component={PlacesDetailPage}   />
        <Route exact path='/map' component={MapPage} />
        <Route exact path='/signup' component={UserRegistrationPage} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    </BrowserRouter>
=======
    <ProvideAuth>
      <BrowserRouter>
        <AppRouter>
          <App />
        </AppRouter>
      </BrowserRouter>
    </ProvideAuth>
>>>>>>> 3359bf2877e601853c8099378369f0d22e0db9e3
  </React.StrictMode>,
  document.getElementById("root")
);

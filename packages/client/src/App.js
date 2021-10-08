import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import {
  LandingPage,
  LoginPage,
  MapPage,
  PlacesDetailPage,
  UserProfilePage,
  UserRegistrationPage,
  AddAPlacePage,
} from "pages";

import { ErrorBoundary, NavbarTop } from "components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./app.scss";
import "./styling/style.scss";
import { useProvideAuth } from "hooks/useAuth";
import axios from "axios";

export default function App() {
  const {
    state: { user },
  } = useProvideAuth();
  // console.log(useProvideAuth());

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="app">
        <ToastContainer />
        <NavbarTop />
        {/* {user ? ( */}
        <>
          <Switch>
            <Route exact path="/users/:uid" component={UserProfilePage} />
            <Route exact path="/add-a-place" component={AddAPlacePage} />
            <Route exact path="/places/:pid" component={PlacesDetailPage} />
            {/* <div className="map" id="someSelector"> */}
            <Route exact path="/map" component={MapPage} />
            {/* </div> */}
            <Route exact path="/signup" component={UserRegistrationPage} />
            {/* <Redirect to="/map" /> */}
            {/* </Route> */}

            <Route exact path="/login" component={LoginPage} />
            {/* <Redirect to="/map" /> */}
            {/* </Route> */}

            <Route exact path="/" component={LandingPage} />
            <Route
              component={({ location }) => {
                return (
                  <div
                    style={{
                      padding: "50px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    The page <code>{location.pathname}</code> could not be
                    found.
                  </div>
                );
              }}
            />
          </Switch>
        </>
        {/* // ) : (
        //   <Switch>
        //     <div className="sections">
        //       <Route exact path="/login" component={LoginPage} />
        //       <Route exact path="/signup" component={UserRegistrationPage} />
        //       <Route path="/" component={LandingPage} />
        //     </div>
        //   </Switch>
        // )}
        // ) */}
      </div>
    </ErrorBoundary>
  );
}

import React, { useEffect } from "react";
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

import { ErrorBoundary, NavbarTop, Header } from "components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./app.scss";
import { useProvideAuth } from "hooks/useAuth";
import axios from "axios";

export default function App() {
  const {
    state: { user },
  } = useProvideAuth();
  console.log(useProvideAuth());

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
          <div className="sections">
            <Container
              fluid
              style={{
                height: "calc(100vh - 72px)",
                overflow: "auto",
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingBottom: "0px"
              }}
            >
              
                <Switch>
                  <Route exact path="/users/:uid" component={UserProfilePage} />
                  <Route exact path="/add-a-place" component={AddAPlacePage} />
                  <Route exact path="/map" component={MapPage} />
                  <Route exact path="/signup" component={UserRegistrationPage}/>
                    {/* <Redirect to="/map" /> */}
                  {/* </Route> */}

                  <Route exact path="/login" component={LoginPage}/>
                    {/* <Redirect to="/map" /> */}
                  {/* </Route> */}

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
              
            </Container>
            </div>
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

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
    <ProvideAuth>
      <BrowserRouter>
        <AppRouter>
          <App />
        </AppRouter>
      </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);

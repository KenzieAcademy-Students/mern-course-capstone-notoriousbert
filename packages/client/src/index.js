import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "AppRouter";
import { ProvideAuth } from "hooks/useAuth";
import { ManagedUIMapCenterContext } from "hooks/useMapCenter";

ReactDOM.render(
  <React.StrictMode>
    <ManagedUIMapCenterContext>
      <ProvideAuth>
        <BrowserRouter>
          <AppRouter>
            <App />
          </AppRouter>
        </BrowserRouter>
      </ProvideAuth>
    </ManagedUIMapCenterContext>
  </React.StrictMode>,
  document.getElementById("root")
);

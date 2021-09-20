import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import LandingPage from 'pages/LandingPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>  
      <Switch>
        <Route exact path='/' component={LandingPage} />
        { /* Add more routes here */} 
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

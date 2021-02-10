import React from "react"
import Main from './Components/Main/Main'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import HomePage from "./Components/HomePage/HomePage"

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/home" component={HomePage} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

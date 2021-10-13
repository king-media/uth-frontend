import logo from './logo.svg';
import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";

import { routesRendererMap } from "./router/routeConfig";

import { TodoStateProvider } from "./state";

export default function TodoApp() {
  return (
      <TodoStateProvider>
          <Router>
              <nav className="App-nav">
                  <img className="App-logo" src={logo} alt="React Logo" width={75}/>
                  <div className="nav-links-container">
                <span>
                    <Link to="/todos" className="App-link">Todos</Link>
                </span>
                      <span>
                    <Link to="/completed-todos" className="App-link">Completed Todos</Link>
                </span>
                  </div>

              </nav>
              <Switch>
                  { routesRendererMap }
              </Switch>
          </Router>
      </TodoStateProvider>
  )
}


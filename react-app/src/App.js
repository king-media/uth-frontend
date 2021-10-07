import logo from './logo.svg';
import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

import TodosPage from './pages/TodosPage'
import CompletedTodosPage from './pages/CompletedTodosPage'

const routes = [
    {
        path: "/todos",
        component: TodosPage,
    },
    {
        path: "/completed-todos",
        component: CompletedTodosPage,
    }
]

function RouteRenderer (route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route?.routes} />
            )}
        />
    )
}

export default function TodoApp() {
    const routesRendererMap = routes.map(route => (
        <RouteRenderer key={route.path} {...route} />
    ))

  return (
      <Router>
        <nav>
            <img src={logo} alt="React Logo" width={75}/>
            <span>
              <Link to="/todos">Todos</Link>
            </span>
            <span>
              <Link to="/completed-todos">Completed Todos</Link>
            </span>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
              { routesRendererMap }
          </Switch>
        </nav>
      </Router>
  );
}


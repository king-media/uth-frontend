import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
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

import { mockFetch } from "../../shared/todosUtils";

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

function RouteRenderer ({ route, todos, updateTodos }) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} todos={todos} updateTodos={updateTodos} routes={route?.routes} />
            )}
        />
    )
}

export default function TodoApp() {
    const [todosList, setTodosList] = useState([])

     useEffect( () => {
         async function fetchData() {
             const response = await mockFetch('localhost:3000/getTodos')

             if (response.status === '200') {
                 setTodosList(response.data)
             }
         }

         fetchData()
    },[])

    const routesRendererMap = routes.map(route => (
        <RouteRenderer key={route.path} todos={ todosList } updateTodos={ updateTodosAction } route={ route } />
    ))


    async function updateTodosAction(todos) {
        const newTodos = [...todos]
        const response = await mockFetch('localhost:3000/updateTodos', { todos: newTodos });
        if (response.status === 200) {
            setTodosList(response.data)
        }
    }

  return (
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
      </Router>
  );
}


import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TodosPage from './pages/TodosPage'
import CompletedTodosPage from './pages/CompletedTodosPage'

import { mockFetch } from "../../shared/todosApi";

export const TodosStateContext = createContext({})

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
                <route.component {...props}  />
            )}
        />
    )
}

export default function TodoApp() {
    const [todosList, setTodosList] = useState([])
    const [fontSize, setFontSize] = useState(1)
    const [completedState, setCompletedState] = useState([])
    const todosStateApi = {
        todos: todosList,
        fontSize,
        completedState,
        handleTodoCompletion,
        changeFontByType,
        updateTodos: updateTodosAction,
        sortTodos: sortTodosAction
    }

    useEffect( () => {
         fetchTodos()
    },[])

    const routesRendererMap = routes.map(route => (
        <RouteRenderer {...route} key={route.path} />
    ))

    function getCompletedState(todos) {
        return todos.map(todo => todo.completed);
    }

    function handleApiResponse(response) {
        if (response.status === '200') {
            setTodosList(response.data)
            setCompletedState(getCompletedState(response.data))
        } else {
            console.error(response.data)
        }
    }

    async function fetchTodos() {
        const response = await mockFetch('localhost:3000/getTodos')
        handleApiResponse(response);
    }

    async function updateTodosAction(todos) {
        const newTodos = [...todos]
        const response = await mockFetch('localhost:3000/updateTodos', { todos: newTodos });

        handleApiResponse(response)
    }

     async function handleTodoCompletion(checkedIndex) {
        const newTodos = todosList.map((todo, index) => {
            if (checkedIndex === index) {
                todo.completed = !todo.completed
            }

            return todo
        })

        await updateTodosAction(newTodos)
    }

    function sortTodosAction() {
        const newTodos = [...todosList].sort((a, b) => {
            const textA = a.text.toLowerCase()
            const textB = b.text.toLowerCase()

            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }

            return 0;
        })

        setTodosList(newTodos)
    }

    function changeFontByType(type) {
        type && type === 'increment' ? setFontSize(fontSize + 1) : setFontSize(1)
    }

  return (
      <TodosStateContext.Provider value={ todosStateApi }>
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
      </TodosStateContext.Provider>
  );
}


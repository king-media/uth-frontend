import logo from './logo.svg';
import './App.css';

import React, { useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";

import { routesRendererMap } from "./router/routeConfig";
import useStateManager from "./hooks/stateManagerHook";

import { mockFetch } from "../../shared/todosApi";
import { lowerAndCamelCase } from "../../shared/string-utils";

export const TodosStateContext = createContext({})

export default function TodoApp() {
    const { internalState, state, updateState: updateTodosState } = useStateManager({
        todos: [],
        fontSize: 1,
        completedState: []
    })

    const todosContextApi = {
        internalTodosRecord: internalState.todos,
        todos: state.todos,
        fontSize: state.fontSize,
        completedState: state.completedState,
        handleTodoCompletion,
        handleFuzzySearch,
        changeFontByType,
        resetTodos,
        updateTodos: updateTodosAction,
        sortTodos: sortTodosAction
    }

    useEffect( () => {
         fetchTodos()
    },[])

    function getCompletedState(todos) {
        return todos.map(todo => todo.completed);
    }

    function handleApiResponse(response) {
        if (response.status === '200') {
            const updateObject = {
                updatedState: {
                    ...internalState,
                    todos: response.data,
                    completedState: getCompletedState(response.data)
                }
            }
            updateTodosState(updateObject)
        } else {
            console.error(response.data)
        }
    }

    async function fetchTodos() {
        const response = await mockFetch('localhost:3000/getTodos')
        handleApiResponse(response)
    }

    async function updateTodosAction(todos) {
        const newTodos = [...todos]
        const response = await mockFetch('localhost:3000/updateTodos', {
            method: 'POST', body: { todos: newTodos }
        });

        handleApiResponse(response)
    }

     async function handleTodoCompletion(checkedIndex) {
        const newTodos = [...internalState.todos]
        newTodos[checkedIndex].completed = !newTodos[checkedIndex].completed

        await updateTodosAction(newTodos)
    }

    function resetTodos() {
        updateTodosState({ updatedState: [...internalState.todos], stateProperty: 'todos'}, false)
    }

    function handleFuzzySearch(search) {
        const textSearch = lowerAndCamelCase(search)
        const newTodos = internalState.todos.filter(todo => lowerAndCamelCase(todo.text).includes(textSearch))

        updateTodosState({ updatedState: newTodos, stateProperty: 'todos' }, false)
    }

    function sortTodosAction() {
        const newTodos = [...state.todos].sort((a, b) => {
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

        updateTodosState({ updatedState: newTodos, stateProperty: 'todos' }, false)
    }

    function changeFontByType(type) {
        let newFontSize = type && type === 'increment' ? state.fontSize + 1 : 1
        updateTodosState({ updatedState: newFontSize, stateProperty: 'fontSize' })
    }

  return (
      <TodosStateContext.Provider value={ todosContextApi }>
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


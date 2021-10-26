import React, { useContext } from 'react'
import TodosList from '../components/TodosList'
import { TodosStateContext } from '../state'

import { lowerAndCamelCase } from "../../../../shared/string-utils";
import { useSearch } from "../hooks/useSearch";

export default function TodosPage(props) {
    const todosContextApi = useContext(TodosStateContext)
    const { search, internalState: internalTodos, handleInput, clearSearch } = useSearch(todosContextApi.todos, handleFuzzySearch)

    function handleFuzzySearch(todo, filterBy) {
        return lowerAndCamelCase(todo.text).includes(lowerAndCamelCase(filterBy))
    }

    const addTodo = () => {
        const newTodos = [...todosContextApi.todos]
        if (search) {
            newTodos.push({ id: Math.random(), text: search, completed: false })
        }

        todosContextApi.updateTodos(newTodos)
        clearSearch()
    }


    const squareNumsInText = (numberSet, text) => {
        const squaredSet = numberSet.map(num => num ** 2)
        squaredSet.forEach((num, i) => {
            text = text.replace(numberSet[i], num)
        })

        return text
    }

    const squareNumbers = () => {
        const regex = /\d+/g
        const newTodos = todosContextApi.todos.map(todo => {
            const numbers = todo.text.match(regex)

            if (numbers) {
                todo.text = squareNumsInText(numbers, todo.text)
            }
            return todo
        })

        todosContextApi.updateTodos(newTodos)
    }

    return (
        <div className="todos-page" style={{ fontSize: `${todosContextApi.fontSize}rem` }}>
            <h2>Todos</h2>
            <input className="search" type="text" placeholder="Search..." value={ search } onChange={ handleInput }/>
            <TodosList todos={ internalTodos } />
            <div className="action-btns-container">
                <button onClick={addTodo}>Add</button>
                <button onClick={todosContextApi.sortTodos}>Sort</button>
                <button onClick={squareNumbers}>^2 Numbers</button>
                <button onClick={() => todosContextApi.changeFontByType('increment')}>Increase Font</button>
                <button onClick={() => todosContextApi.changeFontByType('reset')}>Reset Font</button>
            </div>
        </div>
    );
}

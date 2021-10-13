import React, {useState, useContext, useEffect} from 'react'
import TodosList from '../components/TodosList'
import { TodosStateContext } from '../App'

import _debounce from 'lodash/debounce'

export default function TodosPage(props) {
    const todosStateApi = useContext(TodosStateContext)
    const fuzzySearch =  _debounce(todosStateApi.handleFuzzySearch, 500)
    const [search, setSearch] = useState('')

    const handleInput = ({ target }) => {
        setSearch(target.value);
        fuzzySearch(target.value)
    }

    const squareAction = (numberSet, text) => {
        const squaredSet = numberSet.map(num => num ** 2)
        squaredSet.forEach((num, i) => {
            text = text.replace(numberSet[i], num)
        })

        return text
    }

    const addTodo = () => {
        const newTodos = [...todosStateApi.internalTodosRecord]
        if (search) {
            newTodos.push({ id: Math.random(), text: search, completed: false })
        }

        todosStateApi.updateTodos(newTodos)
        setSearch('')
    }

    const squareNumbers = () => {
        const regex = /\d+/g
        const newTodos = todosStateApi.internalTodosRecord.map(todo => {
            const numbers = todo.text.match(regex)
            if (numbers) {
                todo.text = squareAction(numbers, todo.text)
            }
            return todo
        })

        todosStateApi.updateTodos(newTodos)
    }

    return (
        <div className="todos-page" style={{ fontSize: `${todosStateApi.fontSize}rem` }}>
            <h2>Todos</h2>
            <input className="search" type="text" placeholder="Search..." value={ search } onChange={ handleInput }/>
            <TodosList todos={ todosStateApi.todos } />
            <div className="action-btns-container">
                <button onClick={addTodo}>Add</button>
                <button onClick={todosStateApi.sortTodos}>Sort</button>
                <button onClick={squareNumbers}>^2 Numbers</button>
                <button onClick={() => todosStateApi.changeFontByType('increment')}>Increase Font</button>
                <button onClick={() => todosStateApi.changeFontByType('reset')}>Reset Font</button>
            </div>
        </div>
    );
}

import React, {useState, useContext, useEffect} from 'react'
import TodosList from '../components/TodosList'
import { TodosStateContext } from '../state'

import _debounce from 'lodash/debounce'

export default function TodosPage(props) {
    const todosContextApi = useContext(TodosStateContext)
    const fuzzySearch =  _debounce(todosContextApi.handleFuzzySearch, 500)
    const [search, setSearch] = useState('')

    const handleInput = ({ target }) => {
        setSearch(target.value);
        fuzzySearch(target.value)
    }

    const addTodo = () => {
        const newTodos = [...todosContextApi.internalTodosRecord]
        if (search) {
            newTodos.push({ id: Math.random(), text: search, completed: false })
        }

        todosContextApi.updateTodos(newTodos)
        setSearch('')
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
        const newTodos = todosContextApi.internalTodosRecord.map(todo => {
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
            <TodosList todos={ todosContextApi.todos } />
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

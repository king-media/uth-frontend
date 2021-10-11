import React, { useState } from 'react'
import TodosList from '../components/TodosList'

export default function TodosPage(props) {
    const [search, setSearch] = useState('')

    const handleInput = ({ target }) => {
        setSearch(target.value);
    }

    const squareAction = (numberSet, text) => {
        const squaredSet = numberSet.map(num => num ** 2)
        squaredSet.forEach((num, i) => {
            text = text.replace(numberSet[i], num)
        })

        return text
    }

    const addTodo = () => {
        const newTodos = [...props.todos]
        if (search) {
            newTodos.push({ id: Math.random(), text: search, completed: false })
        }

        props.updateTodos(newTodos)
        setSearch('')
    }

    const squareNumbers = () => {
        const regex = /\d+/g
        const newTodos = props.todos.map(todo => {
            const numbers = todo.text.match(regex)
            if (numbers) {
                todo.text = squareAction(numbers, todo.text)
            }
            return todo
        })

        props.updateTodos(newTodos)
    }

    return (
        <div className="todos-page" style={{ fontSize: `${props.fontSize}rem` }}>
            <h2>Todos</h2>
            <input className="search" type="text" placeholder="Search..." value={search} onChange={handleInput}/>
            <TodosList todos={props.todos} completedState={props.completedState} handleTodoCompletion={props.handleTodoCompletion} />
            <div className="action-btns-container">
                <button onClick={addTodo}>Add</button>
                <button onClick={props.sortTodos}>Sort</button>
                <button onClick={squareNumbers}>^2 Numbers</button>
                <button onClick={() => props.changeFontByType('increment')}>Increase Font</button>
                <button onClick={() => props.changeFontByType('reset')}>Reset Font</button>
            </div>
        </div>
    );
}

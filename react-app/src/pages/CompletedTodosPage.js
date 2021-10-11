import React, { useState } from 'react'
import TodosList from '../components/TodosList'

export default function TodosPage(props) {
    const [search, setSearch] = useState('')
    const completedTodos = props.todos.filter(todo => todo.completed);

    const handleInput = ({ target }) => {
        setSearch(target.value);
    }

    return (
        <div className="todos-page" style={{ fontSize: `${props.fontSize}rem` }}>
            <h2>Completed Todos</h2>
            <input className="search" type="text" placeholder="Search..." value={search} onChange={handleInput}/>
            <TodosList todos={completedTodos} completedState={props.completedState} handleTodoCompletion={props.handleTodoCompletion} />
        </div>
    );
}

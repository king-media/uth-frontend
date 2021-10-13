import React, {useContext, useEffect, useState} from 'react'
import TodosList from '../components/TodosList'
import { TodosStateContext } from "../App";

export default function CompletedTodosPage(props) {
    const todosStateApi = useContext(TodosStateContext)

    const [search, setSearch] = useState('')
    const completedTodos = todosStateApi.internalTodosRecord.filter(todo => todo.completed);

    useEffect(() => {
        todosStateApi.resetTodos()
    },[])

    const handleInput = ({ target }) => {
        setSearch(target.value);
    }

    return (
        <div className="todos-page" style={{ fontSize: `${todosStateApi.fontSize}rem` }}>
            <h2>Completed Todos</h2>
            <input className="search" type="text" placeholder="Search..." value={search} onChange={ handleInput }/>
            <TodosList todos={completedTodos} />
        </div>
    );
}

import React, {useContext, useEffect, useState} from 'react'
import TodosList from '../components/TodosList'
import { TodosStateContext } from "../state";

export default function CompletedTodosPage(props) {
    const todosContextApi = useContext(TodosStateContext)

    const [search, setSearch] = useState('')
    const completedTodos = todosContextApi.internalTodosRecord.filter(todo => todo.completed);

    useEffect(() => {
        todosContextApi.resetTodos()
    },[])

    const handleInput = ({ target }) => {
        setSearch(target.value);
    }

    return (
        <div className="todos-page" style={{ fontSize: `${todosContextApi.fontSize}rem` }}>
            <h2>Completed Todos</h2>
            <input className="search" type="text" placeholder="Search..." value={search} onChange={ handleInput }/>
            <TodosList todos={completedTodos} />
        </div>
    );
}

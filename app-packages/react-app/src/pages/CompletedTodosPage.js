import React, { useContext } from 'react'
import TodosList from '../components/TodosList'
import { TodosStateContext } from "../state";
import { lowerAndCamelCase } from "../../../../../uth-frontend/shared/string-utils";
import { useSearch } from "../hooks/useSearch";

export default function CompletedTodosPage() {
    const todosContextApi = useContext(TodosStateContext)
    const { search, internalState: internalTodos, handleInput } = useSearch(todosContextApi.todos, handleFuzzySearch)

    function handleFuzzySearch(todo, filterBy) {
        return lowerAndCamelCase(todo.text).includes(lowerAndCamelCase(filterBy)) && todo.completed
    }

    return (
        <div className="todos-page" style={{ fontSize: `${todosContextApi.fontSize}rem` }}>
            <h2>Completed Todos</h2>
            <input className="search" type="text" placeholder="Search..." value={search} onChange={ handleInput }/>
            <TodosList todos={ internalTodos } />
        </div>
    );
}

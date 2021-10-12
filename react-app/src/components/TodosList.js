import React, { useContext } from 'react'
import { TodosStateContext } from "../App";

export default function TodosListComponent(props) {
    const todosStateApi = useContext(TodosStateContext)

    const todosMapper = props.todos.map((todo, index) => {
        const fieldName = todo.text.replace(' ', '')
        return (
            <div key={todo.id}>
                <input type="checkbox" onChange={() => todosStateApi.handleTodoCompletion(index) } name={fieldName}
                       checked={todosStateApi.completedState[index] || false}
                />
                <label className={todo.completed ? 'completed-todo' : undefined} htmlFor={fieldName}>
                    { todo.text }
                </label>
            </div>
        )
    })

    return (
        <div className="todos-container" >
            { todosMapper }
        </div>

    )
}

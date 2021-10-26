import React, { useContext } from 'react'
import { TodosStateContext } from "../state";

export default function TodosListComponent(props) {
    const todosStateApi = useContext(TodosStateContext)

    const todosMapper = props.todos.map(todo => {
        const fieldName = todo.text.replace(/\s/g, '')
        const trueIndex = todosStateApi.todos.findIndex(internalTodo => internalTodo.id === todo.id)

        return (
            <div key={todo.id}>
                <input type="checkbox" onChange={() => todosStateApi.handleTodoCompletion(trueIndex) } name={fieldName}
                       checked={todo.completed || false}
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

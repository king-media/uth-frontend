import React, { useContext } from 'react'
import { TodosStateContext } from "../App";

export default function TodosListComponent(props) {
    const todosStateApi = useContext(TodosStateContext)

    const todosMapper = props.todos.map(todo => {
        const fieldName = todo.text.replace(' ', '')
        const trueIndex = todosStateApi.internalTodosRecord.findIndex(internalTodo => internalTodo.text === todo.text)

        return (
            <div key={todo.id}>
                <input type="checkbox" onChange={() => todosStateApi.handleTodoCompletion(trueIndex) } name={fieldName}
                       checked={todosStateApi.completedState[trueIndex] || false}
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

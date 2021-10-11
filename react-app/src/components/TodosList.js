import React from 'react'

export default function TodosListComponent(props) {
    const todosMapper = props.todos.map((todo, index) => {
        const fieldName = todo.text.replace(' ', '')
        return (
            <div key={todo.id}>
                <input type="checkbox" onChange={() => props.handleTodoCompletion(index) } name={fieldName}
                       checked={props.completedState[index] || false}
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

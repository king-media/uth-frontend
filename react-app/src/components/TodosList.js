import React from 'react'

export default function TodosListComponent(props) {
    const todosMapper = props.todos.map(todo => (
        <li className={todo.completed && 'completed-todo'} key={todo.id}>{ todo.text }</li>
    ))

    return (
        <>
           <ul>
               { todosMapper }
           </ul>
        </>
    )
}

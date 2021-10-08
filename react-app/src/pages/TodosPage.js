import React, { useState } from 'react'
import TodosList from '../components/TodosList'

export default function TodosPage(props) {
    const [search, setSearch] = useState('')

    const handleInput = ({ target }) => {
        setSearch(target.value);
    }

    return (
        <div>
            <h2>Todos</h2>
            <input type="text" placeholder="Search..." value={search} onChange={handleInput}/>
            <TodosList todos={props.todos} />
        </div>
    );
}

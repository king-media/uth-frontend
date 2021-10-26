import { createContext, useEffect, useState } from "react";
import { mockFetch } from "../../../../shared/todosApi";
import { initialState } from "../../../../shared/initialState";

export const TodosStateContext = createContext({})

export const TodoStateProvider = props => {
    const [state, setState] = useState(initialState)

    const todosContextApi = {
        todos: state.todos,
        fontSize: state.fontSize,
        handleTodoCompletion,
        changeFontByType,
        updateTodos: updateTodosAction,
        sortTodos: sortTodosAction
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    // API & State Actions

    function handleApiResponse(response) {
        if (response.status === '200') {
            const updateObject = { ...state, todos: response.data }
            setState(updateObject)
        } else {
            console.error(response.data)
        }
    }

    async function fetchTodos() {
        const response = await mockFetch('localhost:3000/getTodos')
        handleApiResponse(response)
    }

    async function updateTodosAction(todos) {
        const newTodos = [...todos]
        const response = await mockFetch('localhost:3000/updateTodos', {
            method: 'POST',
            body: newTodos
        });

        handleApiResponse(response)
    }

    async function handleTodoCompletion(checkedIndex) {
        const newTodos = [...state.todos]
        newTodos[checkedIndex].completed = !newTodos[checkedIndex].completed

        await updateTodosAction(newTodos)
    }

    function sortTodosAction() {
        const newTodos = [...state.todos].sort((a, b) => {
            const textA = a.text.toLowerCase()
            const textB = b.text.toLowerCase()

            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }

            return 0;
        })

        setState({ ...state,  todos: newTodos })
    }

    function changeFontByType(type) {
        let newFontSize = type && type === 'increment' ? state.fontSize + 1 : 1
        setState({ ...state,  fontSize: newFontSize })
    }

    return (
        <TodosStateContext.Provider value={todosContextApi}>
            {props.children}
        </TodosStateContext.Provider>
    )
}

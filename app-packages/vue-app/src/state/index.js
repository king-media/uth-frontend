import { reactive } from "vue";

import { initialState } from "../../../../shared/initialState";
import { mockFetch } from "../../../../shared/todosApi";
import { lowerAndCamelCase } from "../../../../shared/string-utils";

export const todoState = reactive(initialState)
export const stateApi = {
    fetchTodos,
    updateTodosAction,
    sortTodosAction,
    handleTodoCompletion,
    handleFuzzySearch,
    changeFontByType
}

// API & state actions

function handleApiResponse(response) {
    if (response.status === '200') {
        todoState.todos = response.data
    } else {
        console.error(response.data)
    }
}



async function fetchTodos() {
    const response = await mockFetch('localhost:3000/getTodos')
    handleApiResponse(response)
}


async function updateTodosAction(todos) {
    const response = await mockFetch('localhost:3000/updateTodos', {
        method: 'POST',
        body: todos
    });

    handleApiResponse(response)
}

async function handleTodoCompletion(checkedIndex) {
    const newTodos = [...todoState.todos]
    newTodos[checkedIndex].completed = !newTodos[checkedIndex].completed

    await updateTodosAction(newTodos)
}

function sortTodosAction() {
    todoState.todos = [...todoState.todos].sort((a, b) => {
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
}

function handleFuzzySearch(search) {
    const textSearch = lowerAndCamelCase(search)
    return todoState.todos.filter(todo => lowerAndCamelCase(todo.text).includes(textSearch))
}

function changeFontByType(type) {
    if (type && type === 'increment') {
        todoState.fontSize = todoState.fontSize + 1
    } else {
        todoState.fontSize = 1
    }
}

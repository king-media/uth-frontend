import React, { useEffect, useState } from 'react'

export function useSearch(state, filterConditionCb) {
    const [search, setSearch] = useState('')
    const [internalState, setInternalState] = useState([])

    useEffect(() => {
        initializeInternalState() // state callback
    }, [state])

    function initializeInternalState() {
        handleFuzzySearch()
    }

    function handleFuzzySearch(filterBy = search) {
        const newState = state.filter((item) => filterConditionCb(item, filterBy))
        setInternalState(newState)
    }

    const handleInput = ({ target }) => {
        handleFuzzySearch(target.value)
        setSearch(target.value);
    }

    const clearSearch = () => {
        setSearch('')
    }

    return { search, internalState, handleInput, clearSearch }
}


import React, { useState } from 'react'

export default function useStateManager(initialState) {
    const [internalState, setInternalState] = useState(initialState)
    const [stateObject, setStateObject] = useState({
            internalState: Object.freeze(internalState),
            state: initialState
        })

    const updateState = (updateObject, modifyInternalState = true) => {
        if (!updateObject || !updateObject.hasOwnProperty('updatedState')) {
            return console.error('state not updated pass correct update object')
        }

        let state = updateObject.updatedState

        if (updateObject.stateProperty) {
            state = { ...internalState }
            state[updateObject.stateProperty] = updateObject.updatedState
        }

        if (updateObject.stateIndex) {
            state = [...internalState]
            state[updateObject.index] = updateObject.updatedState
        }

        modifyInternalState && setInternalState(state)

        const readOnlyState = modifyInternalState ? Object.freeze(state) : Object.freeze(internalState)
        setStateObject({ internalState: readOnlyState, state })
    }

    return { ...stateObject, updateState }
}

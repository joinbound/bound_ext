const initState = {
    berries: 0,
    user: {}
}

function INCREMENT(state, action) {
    return {
        berries: state.berries++
    }
}
function DECREMENT(state, action) {
    return {
        berries: state.berries++
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return INCREMENT(state, action);
        case 'DECREMENT':
            return DECREMENT(state, action);
        default:
            return state
    }
}
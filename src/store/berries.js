//ACTIONs
const GET_BERRIES = 'GET_BERRIES';

//ACTION CREATORS
const gotBerries = berryCount => ({ type: GET_BERRIES, berryCount });

//THUNKS (have to write function to make call to DB for berry count)

const initialState = {
  berries: 0,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BERRIES:
      return { ...state, berries: action.berryCount };
    default:
      return state;
  }
}

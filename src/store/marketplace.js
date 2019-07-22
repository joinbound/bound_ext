//ACTIONS
const GET_MARKETPLACE_ITEMS = 'GET_MARKETPLACE_ITEMS';

//ACTION CREATORS
const gotMarketplaceItems = store => ({ type: GET_MARKETPLACE_ITEMS, store });

//THUNKS (have to write function to make call to DB for berry count)
export const fetchMarketplace = ({
  getFirestore,
  getFirebase,
}) => async dispatch => {
  try {
    const firestore = getFirestore();
    firestore
      .collection('marketplace')
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          dispatch(gotMarketplaceItems(doc.data()));
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  store: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MARKETPLACE_ITEMS:
      return { ...state, store: action.store };
    default:
      return state;
  }
}

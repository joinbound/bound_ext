import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import marketplace from './marketplace';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    reduxFirestore(),
    reactReduxFirebase(),
    createLogger({ collapsed: true })
  )
);
const store = createStore(marketplace, middleware);

export default store;

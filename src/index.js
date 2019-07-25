import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { SignInProvider } from './providers';
import Home from './Home';
import Firebase from './providers/firebase/firebase';
import { FirebaseContext } from './providers/firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <SignInProvider>
      <Home></Home>
    </SignInProvider>
  </FirebaseContext.Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();

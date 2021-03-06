import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();

    this.googleProvider = new app.auth.GoogleAuthProvider();

    this.googleProvider.addScope(
      "https://www.googleapis.com/auth/calendar.readonly"
    );
    this.db = app.firestore();
  }
  // *** Auth API ***

  authInstance = () => this.auth;

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithCredential = credentials => {
    const token = this.googleProvider.credential(credentials.oauthIdToken);
    return this.auth.signInWithCredential(token);
  };

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  exportToDB = () => this.db;
}

export default Firebase;

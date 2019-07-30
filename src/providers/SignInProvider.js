import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from './firebase';
import Home from '../Home';

class SignInBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, user: null };
  }

  // Init, retrieve for credentials from localStorage, if it's there update credentials
  componentDidMount() {
    // Retrieve and parse credentials from localStorage
    const credentials = JSON.parse(localStorage.getItem('credentials'));

    // If does not exist, set logged out state
    if (!credentials) {
      return this.setState({ error: null, user: null });
    }

    // Validate credentials and handlelogin
    this.props.firebase
      .signInWithCredential(credentials)
      .then(userCredential => {
        this.handleLogin(userCredential);
      })

      .catch(error => {
        this.handleLogout(error);
      });
  }

  // Handle Login Status: update credentials in localStorage and state
  handleLogin = userCredential => {
    const { credential, user } = userCredential;
    localStorage.setItem('credentials', JSON.stringify(credential.toJSON()));
    this.setState({ error: null, user });
  };

  // Handle Logout Status: clear credentials in localStorage and state
  handleLogout = (error = null) => {
    localStorage.removeItem('credentials');
    this.setState({ error, user: null });
  };

  // Handle user login
  signIn = event => {
    this.props.firebase
      .doSignInWithGoogle()

      .then(userCredential => {
        this.handleLogin(userCredential);
      })
      .then(authUser => {
        // Create a user in Cloud Firestore DB
        return this.props.firebase
          .exportToDB()
          .collection('users')
          .doc(this.state.user.email)
          .set(
            {
              berries: 50,
              user: this.state.user.uid,
              email: this.state.user.email,
              rewards: [],
            },
            { merge: true }
          );
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  // Handle user logout
  signOut = event => {
    this.handleLogout();
  };

  render() {
    const { user } = this.state;
    const { firebase } = this.props;
    console.log(user);
    return (
      <>
        {user ? (
          <Home signOut={this.signOut} firebase={firebase} user={user} />
        ) : (
          <div id="signin">
            <div id="logoAndBttn">
            <img id="logo" src="/images/WhiteBoundLogo.png" alt="bound logo" />
            <button onClick={this.signIn} id="signinButton">
              <span className="icon" />
              <span className="buttonText"> Sign in with Google</span>
            </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
const SignInProvider = compose(withFirebase)(SignInBase);

export default SignInProvider;

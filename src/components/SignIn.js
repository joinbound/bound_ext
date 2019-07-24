import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from './firebase';
import { compose } from 'recompose';
import NavBar from './NavBar';


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
    this.setState({ error: null, user: user });
  };

  // Handle Logout Status: clear credentials in localStorage and state
  handleLogout = (error = null) => {
    localStorage.removeItem('credentials');
    this.setState({ error: error, user: null });
  };

  // Handle user login
  signIn = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(userCredential => {
        this.handleLogin(userCredential);
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
    return (
      <>
        {user ? (
          <>
            <NavBar signOut={this.signOut} />
          </>
        ) : (
          <div id="signin">
            <div id="logoContainer">
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
const SignIn = compose(
  withRouter,
  withFirebase
)(SignInBase);

export default SignIn;

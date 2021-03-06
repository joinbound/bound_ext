import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "./firebase";
import Home from "../Home";

class SignInBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, user: null };
  }

  // Init, retrieve for credentials from localStorage, if it's there update credentials
  componentDidMount() {
    // Retrieve and parse credentials from localStorage
    const credentials = JSON.parse(localStorage.getItem("credentials"));

    // If does not exist, set logged out state
    if (!credentials) {
      return this.setState({ error: null, user: null });
    }

    this.props.firebase
      .signInWithCredential(credentials)
      .then(userCredential => {
        // console.log(userCredential);
        // this.props.firebase.auth.currentUser.getIdToken(true).then(function (idToken) {
        //   console.log(idToken);
        // });
        this.handleLogin({
          user: userCredential.user,
          credential: credentials
        });
      })
      .catch(error => {
        this.handleLogout(error);
      });
  }

  // Handle Login Status: update credentials in localStorage and state
  handleLogin = userCredential => {
    const { credential, user } = userCredential;
    localStorage.setItem("credentials", JSON.stringify(credential));

    this.setState({ error: null, user });
  };

  // Handle Logout Status: clear credentials in localStorage and state
  handleLogout = (error = null) => {
    localStorage.removeItem("credentials");
    this.props.firebase.auth.signOut();
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
        this.props.firebase
          .exportToDB()
          .collection("users")
          .doc(this.state.user.email)
          .get()
          .then(document => {
            if (!document.exists) {
              this.props.firebase
                .exportToDB()
                .collection("users")
                .doc(this.state.user.email)
                .set(
                  {
                    berries: 50,
                    user: this.state.user.uid,
                    email: this.state.user.email,
                    rewards: [],
                    checkedInEvents: []
                  },
                  { merge: true }
                );
            }
          });
        return;
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
    return (
      <>
        {user ? (
          <Home signOut={this.signOut} firebase={firebase} user={user} />
        ) : (
          <div id="signin">
            <div id="logoAndBttn">
              <img
                id="logo"
                src="/images/WhiteBoundLogo.png"
                alt="bound logo"
              />
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

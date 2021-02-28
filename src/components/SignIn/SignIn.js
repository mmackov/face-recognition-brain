import React, { Component } from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Constants from "../../constants/constants";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    toast.configure();
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  canBeSubmitted() {
    const { email, password } = this.state;
    return (
      email.length >= 6 &&
      new RegExp(Constants.EMAIL_REGEX).test(email) &&
      password.length >= 6
    );
  }
  onSumbitSignIn = () => {
    fetch(`${Constants.URL_BACKEND}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      } else {
        toast.error(user,
        {position: toast.POSITION.TOP_CENTER});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  handleKeyPress = (event) => {      
    // It triggers by pressing the enter key
    if (event.key === "Enter" && this.canBeSubmitted()) {
      this.onSumbitSignIn();
    }
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  pattern={Constants.EMAIL_REGEX}
                  title="Must contain '@' and '.' with domain at least 2 characters"
                  onChange={this.onEmailChange}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  pattern=".{6,}"
                  title="Required 6 or more characters"
                  onChange={this.onPasswordChange}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                disabled={!this.canBeSubmitted()}
                onClick={this.onSumbitSignIn}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
};

export default SignIn;

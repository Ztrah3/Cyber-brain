import React from 'react';

// Signin component
class Signin extends React.Component {
  constructor(props) {
    // Call the constructor of the parent class (React.Component)
    super(props);
    // Initialize the state of the Signin component with empty strings for signInEmail and signInPassword
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  // Method to handle email change
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  // Method to handle password change
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  // Method to handle form submission
  onSubmitSignIn = () => {
    // Send a POST request to the signin endpoint of the API
    fetch('https://aqueous-earth-88471-1d6fe5b30998.herokuapp.com/signin', {
      method: 'post', // Specify the HTTP method as POST
      headers: {'Content-Type': 'application/json'}, // Set the content type of the request to JSON
      body: JSON.stringify({ // Convert the request body to a JSON string
        // Include the current signInEmail and signInPassword state in the request body
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json()) // Convert the response to JSON
      .then(user => {
        // If the user object has an id property, load the user and change the route to 'home'
        if (user.id) {
          this.props.loadUser(user) // Load the user data
          this.props.onRouteChange('home'); // Change the route to 'home'
        }
      })
  }

  // Rendering the form
  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
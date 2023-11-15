import React from 'react';

// Register component
class Register extends React.Component {
  constructor(props) {
    // Call the constructor of the parent class (React.Component)
    super(props);
    // Initialize the state of the Register component with empty strings for email, password, and name
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  // Method to handle name change
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  // Method to handle email change
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  // Method to handle password change
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  // Method to handle form submission
  onSubmitSignIn = () => {
    // Send a POST request to the endpoint of the API
    fetch('https://aqueous-earth-88471-1d6fe5b30998.herokuapp.com/register', {
      method: 'post', // Specify the HTTP method as POST
      headers: {'Content-Type': 'application/json'}, // Set the content type of the request to JSON

      body: JSON.stringify({ // Convert the request body to a JSON string
        // Include the current email, password, and name state in the request body
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
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
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
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
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
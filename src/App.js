import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

// Initial state of the app
const initialState = {
        input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

// Main App component
class App extends Component {
  constructor() {
    // Call the constructor of the parent class (Component)
    super();
    // Initialize the state of the App component with the initial state
    this.state = initialState;
  }

  // Method to load user data
  loadUser = (data) => {
    // Update the state of the App component with the user data
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // Method to calculate face location
  calculateFaceLocation = (data) => {
    // Extract the bounding box data from the Clarifai API response
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // Get the image element by its ID
    const image = document.getElementById('inputimage');
    // Get the width and height of the image and convert them to numbers
    const width = Number(image.width);
    const height = Number(image.height);
    // Return an object with the calculated face location
    return {
      // The left column of the face location is calculated by multiplying the left_col value from the 
      // Clarifai API response by the image width
      leftCol: clarifaiFace.left_col * width,
      // The top row of the face location is calculated by multiplying the top_row value from the 
      // Clarifai API response by the image height
      topRow: clarifaiFace.top_row * height,
       // The right column of the face location is calculated by subtracting the result of multiplying 
       // the right_col value from the Clarifai API response by the image width from the image width
      rightCol: width - (clarifaiFace.right_col * width),
      // The bottom row of the face location is calculated by subtracting the result of multiplying the 
      // bottom_row value from the Clarifai API response by the image height from the image height
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // Method to display face box
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  // Method to handle input change
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // Method to handle button submit
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
   
    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. 

    // Fetching data from the API
      fetch('https://aqueous-earth-88471-1d6fe5b30998.herokuapp.com/imageurl', {
        method: 'post', // Specify the HTTP method as POST
        headers: {'Content-Type': 'application/json'}, // Set the content type of the request to JSON
        body: JSON.stringify({// Set the content type of the request to JSON
          input: this.state.input // Include the current input state in the request body
        })
      })
      .then(response => response.json()) // Convert the response to JSON
      .then(response => {
        if (response) {
          fetch('https://aqueous-earth-88471-1d6fe5b30998.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id // Include the current user's ID in the request body
            })
          })
            .then(response => response.json())
            .then(count => { 
              // Update the entries count in the user state
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log) // Log any errors that occur during the fetch

        }
        // Calculate and display the face box
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err)); // Log any errors that occur during the fetch
  } 

  // Method to handle route change
  onRouteChange = (route) => {
    if (route === 'signout') {
      // If the new route is 'signout', reset the state to its initial state
      this.setState(initialState)
      // If the new route is 'home', set the 'isSignedIn' state to true
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    // Update the 'route' state to the new route
    this.setState({route: route});
  }

  // Rendering the components
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;

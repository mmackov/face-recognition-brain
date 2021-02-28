import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Constants from "./constants/constants";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  faceBoxes: [],
  route: "signIn",
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    entriesSession: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    toast.configure();
  }

  calculateFaceLocation = (data) => {
    if (data.outputs) {
      const clarifaiFaces = data.outputs[0].data.regions;
      // Some faces have been found
      if (clarifaiFaces) {
        const image = document.getElementById("input-image");
        const width = Number(image.width);
        const height = Number(image.height);

        // Increment the user's successful entries only if faces have been found
        this.updateUserEntries();
        
        return clarifaiFaces.map((face) => {
          const boundingBox = face.region_info.bounding_box;
          return {
            leftCol: boundingBox.left_col * width,
            topRow: boundingBox.top_row * height,
            rightCol: width - boundingBox.right_col * width,
            bottomRow: height - boundingBox.bottom_row * height,
          };
        });
      } else {
        // No faces found so return empty array (no boxes)
        return [];
      }
    } else {
      toast.error("Face detection faled!",
        {position: toast.POSITION.TOP_RIGHT});
    }
  };

  updateUserEntries = () => {
    fetch(`${Constants.URL_BACKEND}/image`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        if (count !== 'User not found') {
          this.setState(Object.assign(this.state.user, 
            { entries: count,
              entriesSession: this.state.user.entriesSession + 1
            }));
        }
      })
      .catch(console.log);
  };

  displayFaceBox = (faceBoxes) => {
    this.setState({ faceBoxes: faceBoxes });
    if (faceBoxes.length === 0) {
      toast.info("No faces found",
        { position: toast.POSITION.TOP_CENTER,
          autoClose: Constants.TOAST_AUTO_CLOSE_LONG_MS
        });
    } else {
      toast.success(`${faceBoxes.length} faces found`,
        { position: toast.POSITION.TOP_CENTER,
          autoClose: Constants.TOAST_AUTO_CLOSE_LONG_MS
        });
    }
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = (base64) => {
    if (base64 || this.state.input) {
      if (base64) {
        this.setState({ imageUrl: base64 });
      } else {
        this.setState({ imageUrl: this.state.input });
      }
      fetch(`${Constants.URL_BACKEND}/image-url`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          imageUrl: base64 ? null : this.state.input,
          base64: base64 ? base64 : null
        })
      })
      .then(response => response.json())
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  onRouteChange = (route) => {
    if (route === "signOut") {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  loadUser = (user) => {
    this.setState(Object.assign(this.state.user, user));
  }

  render() {
    const { imageUrl, route, faceBoxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          route={route}
        />
        { route === "home"
          ? <div>
              <div className="items-center" style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr"}}>
                <Logo />
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                  entriesSession={this.state.user.entriesSession}/>
              </div>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition
                imageUrl={imageUrl}
                faceBoxes={faceBoxes}
              />
            </div>
          : (
              route === "signIn" || route === "signOut"
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;

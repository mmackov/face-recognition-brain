import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
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

const app = new Clarifai.App({
  apiKey: "3868ac5ce83a436b8b955bd53300e441",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      faceBoxes: [],
      route: "signIn",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map((face) => {
      const boundingBox = face.region_info.bounding_box;
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - boundingBox.right_col * width,
        bottomRow: height - boundingBox.bottom_row * height,
      };
    });
  };

  displayFaceBox = (faceBoxes) => {
    this.setState({ faceBoxes: faceBoxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((error) => console.log(error));
  };

  onRouteChange = (route) => {
    if (route === "signOut") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, faceBoxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        { route === "home"
          ? <div>
              <Logo />
              <Rank />
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
              route === "signIn"
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;

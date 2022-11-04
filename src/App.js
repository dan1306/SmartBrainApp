import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import FaceRrecognition from "./components/FaceRrecognition/FaceRrecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
// import Clarifai from "clarifai";

// const app = new Clarifai.App({
//   apiKey: "4bad5dc00a2f4e0ba2419ff12c3503c1",
// });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarafaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.wdith);
    const height = Number(image.height);
    return {
      lefcol: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightCol: width - clarafaiFace.rightCol * width,
      bottomRow: height - clarafaiFace.rightCol * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box });
  };

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  onInputChange = (e) => {
    console.log(e.target.value);
    this.setState({ input: e.target.value });
  };

  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  onButtonSubmit = async () => {
    try {
      console.log(this.state.input);
      // await this.setState({ imageUrl: this.state.input });
      // app.models
      //   .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      //   .then((res) => {
      //     console.log(res);
      //     // this.displayFaceBox(this.calculateFaceLocation(res));
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="fountain" num={20} bg={true} />

        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRrecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}

      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import Particles from "./components/Particles/Particles";
import FaceRrecognition from "./components/FaceRrecognition/FaceRrecognition";
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

  onInputChange = (e) => {
    console.log(e.target.value);
    this.setState({ input: e.target.value });
  };

  onButtonSubmit = async () => {
    try {
      console.log(this.state.input);
      await this.setState({ imageUrl: this.state.input });
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
    return (
      <div className="App">
        <Particles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRrecognition box={this.state.box} imageUrl={this.state.imageUrl} />

        {/* {      


   



    <FaceRrecognition />} */}
      </div>
    );
  }
}

export default App;

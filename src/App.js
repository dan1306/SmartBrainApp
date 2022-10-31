import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import Particles from './components/Particles/Particles'


function App() {
  
  return (
    <div className="App">
      <Particles />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      {/* {      


   



    <FaceRrecognition />} */}
    </div>
  );
}

export default App;

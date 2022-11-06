import React from "react";
import "./FaceRrecognition.css";

const Box = ({ bx }) => {
    return (
        <div
        className="bounding-box"
        style={{
          top: bx.topRow,
          right: bx.rightCol,
          bottom: bx.bottomRow,
          left: bx.leftCol,
        }}
      ></div>
    )
}

export default Box;
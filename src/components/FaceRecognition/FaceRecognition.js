import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
  const imageStyle = imageUrl.startsWith("http")
    ? "ba bw3 b--gold br3 shadow-5"
    : "";
  const boundingBoxes = faceBoxes.map((box) => (
    <div
      className="bounding-box"
      style={{
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol,
      }}
    ></div>
  ));

  return (
    <div className="center-flex ma">
      <div className="absolute mt4">
        <img
          id="input-image"
          className={imageStyle}
          alt=""
          src={imageUrl}
          height="auto"
          width="auto"
          style={{ maxWidth: "600px" }}
        />
        {boundingBoxes}
      </div>
    </div>
  );
};

export default FaceRecognition;

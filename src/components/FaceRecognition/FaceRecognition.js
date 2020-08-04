import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  const imageStyle = imageUrl.startsWith("http")
    ? "ba bw3 b--gold br3 shadow-5"
    : "";
  return (
    <div className="center ma">
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
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;

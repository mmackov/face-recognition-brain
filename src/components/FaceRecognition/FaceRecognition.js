import React from "react";

const FaceRecognition = ({ imageUrl }) => {
  const baseStyle = "center ma4";
  const fullStyle = imageUrl.startsWith("http")
    ? baseStyle + " ba bw3 b--gold br3 shadow-5"
    : baseStyle;
  return (
    <div>
      <img
        className={fullStyle}
        alt=""
        src={imageUrl}
        height="auto"
        width="auto"
        style={{ maxWidth: "600px" }}
      />
    </div>
  );
};

export default FaceRecognition;

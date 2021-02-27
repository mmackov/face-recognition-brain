import React from "react";
import FileUploader from "../FileUploader/FileUploader";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  const handleKeyPress = (event) => {      
    // It triggers by pressing the enter key
    if (event.key === "Enter") {
      onSubmit(null);
    }
  };

  return (
    <div>
      <p className="f3">
        {"This Smart Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center-flex items-center">
        <div className="center-flex form pa4 mr4 br3 shadow-5">
          <input
            className="f4 pa2 w-70"
            type="text"
            placeholder="Image public URL"
            onChange={onInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="w-30 grow f4 link ph3 pv dib white bg-light-purple"
            onClick={() => onSubmit(null)}
          >
            Detect
          </button>
        </div>
        <FileUploader onSubmitBase64={onSubmit}/>
      </div>
    </div>
  );
};

export default ImageLinkForm;

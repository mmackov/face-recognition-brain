import React from "react";
import Dropzone from "react-dropzone-uploader";
import imageCompression from "browser-image-compression";
import "react-dropzone-uploader/dist/styles.css";
import "./FileUploader.css";

const FileUploader = ({ onSubmitBase64 }) => {
    // called every time a file's 'status' changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      let image = files[0].file;
      let options = {
        maxSizeMB: 3.5,
        maxWidthOrHeight: 512,
        useWebWorker: true
      }
      imageCompression(image, options)
        .then((compressedFile) => {
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          return imageCompression.getDataUrlFromFile(compressedFile)
            .then((base64ImageData) => {
              console.log("base64ImageData: ", base64ImageData);
              allFiles.forEach(f => f.remove());
              return onSubmitBase64(base64ImageData);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  
    return (
      <Dropzone
        //getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop a file, Click to browse"
        onSubmit={handleSubmit}
        accept="image/*"
        styles={{
          dropzone: {width: 200, height: 150, overflow: 'hidden'},
          dropzoneActive: {borderColor: 'green'},
        }}
      />
    )
  }

  export default FileUploader;
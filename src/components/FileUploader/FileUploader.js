import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const FileUploader = ({ onSubmitBase64 }) => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      let image = files[0];
      let responseText = image.xhr.response;
      let base64 = responseText.substring(responseText.indexOf("base64,") + 7);
      base64 = base64.substring(0, base64.indexOf("\"")); 
      console.log("Submitting base64:", base64);
      console.log("Image preview URL:", image.meta.previewUrl);
      allFiles.forEach(f => f.remove());
      onSubmitBase64(base64, image.meta.previewUrl);
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop a local file"
        onSubmit={handleSubmit}
        accept="image/*"
        styles={{
          dropzone: { width: 400, height: 100 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    )
  }

  export default FileUploader;
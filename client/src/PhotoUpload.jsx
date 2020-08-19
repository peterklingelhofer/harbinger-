import React, { useState } from 'react';

const PhotoUpload = () => {
  const [file, setFile] = useState(null);

  const changeHandler = (e) => {
    setFile(null);
    e.persist();
    if (e.target.files) {
      const newImage = {
        name: e.target.files[0].name,
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };
      setFile(newImage);
    }
  };

  return (
    <div>
      <input onChange={changeHandler} type="file" accept=".jpg, .png, .jpeg" />
      {!file ? 'Select an Image' : <img src={file.url} alt="upload" />}
    </div>
  );
};

export default PhotoUpload;

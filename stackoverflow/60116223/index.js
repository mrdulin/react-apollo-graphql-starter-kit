import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';

const UploadComponent = () => {
  const [url, setUrl] = useState('');

  const upload = async () => {
    await RNFetchBlob.fetch(
      'POST',
      'https://www.example.net/api/v1/upload-image',
      {
        Authorization: 'Bearer token',
        'Content-Type': 'application/octet-stream',
      },
      'base64string',
    )
      .then((res) => res.json())
      .then((res) => {
        setUrl(res.url);
      });
  };

  return (
    <div>
      <button onClick={upload}>Upload</button>
      <span>{url}</span>
    </div>
  );
};

export default UploadComponent;
